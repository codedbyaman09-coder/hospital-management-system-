import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import connectToDatabase from '../../../../lib/db';
import User from '../../../../models/User';
import { sendVerificationEmail } from '../../../../lib/mail';
import { z } from 'zod';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  role: z.enum(['Admin', 'Doctor', 'Staff', 'Patient']).optional().default('Patient'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate input
    const validatedData = registerSchema.safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json(
        { message: 'Validation Error', errors: validatedData.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { fullName, email, phone, password, role } = validatedData.data;

    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email is already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const hashedVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

    // Create user
    const user = await User.create({
      fullName,
      email,
      phone,
      password: hashedPassword,
      role,
      emailVerificationToken: hashedVerificationToken,
    });

    // Send verification email
    try {
      await sendVerificationEmail(user.email, verificationToken);
    } catch (error) {
      // If email fails, we shouldn't necessarily fail registration, 
      // but we might want to log it or handle it. For now, log it.
      console.error('Error sending verification email:', error);
    }

    return NextResponse.json(
      { 
        message: 'User registered successfully. Please check your email to verify your account.',
        userId: user._id 
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
