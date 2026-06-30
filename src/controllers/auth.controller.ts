import { AuthService } from '../services/auth.service';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { cookies } from 'next/headers';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

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

export class AuthController {
  private service: AuthService;

  constructor() {
    this.service = new AuthService();
  }

  async login(req: Request) {
    try {
      const body = await req.json();
      const validatedData = loginSchema.safeParse(body);
      
      if (!validatedData.success) {
        return NextResponse.json({ message: 'Validation Error', errors: validatedData.error.flatten().fieldErrors }, { status: 400 });
      }

      const { email, password } = validatedData.data;
      const { accessToken, refreshToken, user } = await this.service.login(email, password);

      const cookieStore = await cookies();
      cookieStore.set('accessToken', accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 15 * 60, path: '/' });
      cookieStore.set('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 7 * 24 * 60 * 60, path: '/' });

      return NextResponse.json({ message: 'Login successful', user }, { status: 200 });
    } catch (error: any) {
      if (error.message === 'Invalid credentials') {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
      }
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }

  async register(req: Request) {
    try {
      const body = await req.json();
      const validatedData = registerSchema.safeParse(body);
      
      if (!validatedData.success) {
        return NextResponse.json({ message: 'Validation Error', errors: validatedData.error.flatten().fieldErrors }, { status: 400 });
      }

      const { userId } = await this.service.register(validatedData.data);
      return NextResponse.json({ message: 'User registered successfully. Please check your email to verify your account.', userId }, { status: 201 });
    } catch (error: any) {
      if (error.message === 'Email is already registered') {
        return NextResponse.json({ message: 'Email is already registered' }, { status: 400 });
      }
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }
}

export const authController = new AuthController();
