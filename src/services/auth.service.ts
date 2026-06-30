import { AuthRepository } from '../repositories/auth.repository';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt';
import { sendVerificationEmail } from '@/lib/mail';

export class AuthService {
  private repository: AuthRepository;

  constructor() {
    this.repository = new AuthRepository();
  }

  async login(email: string, password: string) {
    const user = await this.repository.findUserByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) throw new Error('Invalid credentials');

    const accessToken = generateAccessToken(user.id.toString(), user.role);
    const refreshToken = generateRefreshToken(user.id.toString());

    await this.repository.updateRefreshToken(user.id, refreshToken);

    const userWithoutPassword = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    };

    return { accessToken, refreshToken, user: userWithoutPassword };
  }

  async register(data: any) {
    const { fullName, email, phone, password, role } = data;
    const existingUser = await this.repository.findUserByEmail(email);
    if (existingUser) throw new Error('Email is already registered');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const hashedVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

    const user = await this.repository.createUser({
      fullName,
      email,
      phone,
      password: hashedPassword,
      role: role || 'Patient',
      emailVerificationToken: hashedVerificationToken,
    });

    try {
      await sendVerificationEmail(user.email, verificationToken);
    } catch (error) {
      console.error('Error sending verification email:', error);
    }

    return { userId: user.id };
  }
}
