import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '../../../../lib/db';
import User from '../../../../models/User';
import { generateAccessToken, generateRefreshToken } from '../../../../lib/jwt';
import { z } from 'zod';
import { cookies } from 'next/headers';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input
    const validatedData = loginSchema.safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json(
        { message: 'Validation Error', errors: validatedData.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, password } = validatedData.data;

    await connectToDatabase();

    // Find user by email and explicitly select password because it's set to select: false in model
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check if user is verified (Optional based on requirements, but standard practice)
    // if (!user.isVerified) {
    //   return NextResponse.json(
    //     { message: 'Please verify your email before logging in' },
    //     { status: 403 }
    //   );
    // }

    // Verify password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id.toString(), user.role);
    const refreshToken = generateRefreshToken(user._id.toString());

    // Save refresh token to user document
    user.refreshToken = refreshToken;
    await user.save();

    // Set cookies using next/headers
    const cookieStore = await cookies();
    
    // Set Access Token Cookie
    cookieStore.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 minutes
      path: '/',
    });

    // Set Refresh Token Cookie
    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    // Don't send password back to client
    const userWithoutPassword = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    };

    return NextResponse.json(
      { 
        message: 'Login successful',
        user: userWithoutPassword
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
