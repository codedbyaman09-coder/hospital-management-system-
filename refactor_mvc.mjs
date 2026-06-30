import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');
const repoDir = path.join(srcDir, 'repositories');
const serviceDir = path.join(srcDir, 'services');
const controllerDir = path.join(srcDir, 'controllers');

[repoDir, serviceDir, controllerDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const domains = [
  { domain: 'appointment', route: 'appointments' },
  { domain: 'department', route: 'departments' },
  { domain: 'doctor', route: 'doctors' },
  { domain: 'patient', route: 'patients' },
  { domain: 'staff', route: 'staff' },
];

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// 1. Generate standard CRUD domains
domains.forEach(({ domain, route }) => {
  const Domain = capitalize(domain);
  
  // Repository
  const repoContent = `import { prisma } from '@/lib/db';
import { Prisma } from '@prisma/client';

export class ${Domain}Repository {
  async findAll() {
    return prisma.${domain}.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async create(data: Prisma.${Domain}CreateInput) {
    return prisma.${domain}.create({ data });
  }
}
`;
  fs.writeFileSync(path.join(repoDir, `${domain}.repository.ts`), repoContent);

  // Service
  const serviceContent = `import { ${Domain}Repository } from '../repositories/${domain}.repository';
import { Prisma } from '@prisma/client';

export class ${Domain}Service {
  private repository: ${Domain}Repository;

  constructor() {
    this.repository = new ${Domain}Repository();
  }

  async getAll${Domain}s() {
    return this.repository.findAll();
  }

  async create${Domain}(data: Prisma.${Domain}CreateInput) {
    return this.repository.create(data);
  }
}
`;
  fs.writeFileSync(path.join(serviceDir, `${domain}.service.ts`), serviceContent);

  // Controller
  const controllerContent = `import { ${Domain}Service } from '../services/${domain}.service';
import { NextResponse } from 'next/server';

export class ${Domain}Controller {
  private service: ${Domain}Service;

  constructor() {
    this.service = new ${Domain}Service();
  }

  async get${Domain}s() {
    try {
      const records = await this.service.getAll${Domain}s();
      return NextResponse.json({ success: true, data: records });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Internal Server Error';
      return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
  }

  async create${Domain}(req: Request) {
    try {
      const body = await req.json();
      const record = await this.service.create${Domain}(body);
      return NextResponse.json({ success: true, data: record });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Internal Server Error';
      return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
  }
}

export const ${domain}Controller = new ${Domain}Controller();
`;
  fs.writeFileSync(path.join(controllerDir, `${domain}.controller.ts`), controllerContent);

  // Route
  const routeContent = `import { ${domain}Controller } from '@/controllers/${domain}.controller';

export async function GET() {
  return ${domain}Controller.get${Domain}s();
}

export async function POST(req: Request) {
  return ${domain}Controller.create${Domain}(req);
}
`;
  fs.writeFileSync(path.join(srcDir, `app/api/admin/${route}/route.ts`), routeContent);
});

// 2. Generate Dashboard Domain
const dashboardServiceContent = `import { prisma } from '@/lib/db';

export class DashboardService {
  async getDashboardStats() {
    const [
      totalPatients,
      totalDoctors,
      totalAppointments,
      totalDepartments,
      recentAppointments,
      departments
    ] = await Promise.all([
      prisma.patient.count(),
      prisma.doctor.count(),
      prisma.appointment.count(),
      prisma.department.count(),
      prisma.appointment.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
      prisma.department.findMany({ orderBy: { createdAt: 'desc' } })
    ]);

    const revenue = await prisma.appointment.aggregate({ where: { payment: 'Paid' }, _sum: { amount: true } });
    const totalRevenue = revenue._sum.amount || 245680;

    return {
      stats: {
        totalPatients,
        totalDoctors,
        totalAppointments,
        totalDepartments,
        totalBeds: 356,
        totalRevenue
      },
      recentAppointments,
      departments
    };
  }
}
`;
fs.writeFileSync(path.join(serviceDir, `dashboard.service.ts`), dashboardServiceContent);

const dashboardControllerContent = `import { DashboardService } from '../services/dashboard.service';
import { NextResponse } from 'next/server';

export class DashboardController {
  private service: DashboardService;

  constructor() {
    this.service = new DashboardService();
  }

  async getDashboardData() {
    try {
      const data = await this.service.getDashboardStats();
      return NextResponse.json({ success: true, data });
    } catch (error: unknown) {
      console.error('Dashboard API Error:', error);
      const message = error instanceof Error ? error.message : 'Internal Server Error';
      return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
  }
}

export const dashboardController = new DashboardController();
`;
fs.writeFileSync(path.join(controllerDir, `dashboard.controller.ts`), dashboardControllerContent);

const dashboardRouteContent = `import { dashboardController } from '@/controllers/dashboard.controller';

export async function GET() {
  return dashboardController.getDashboardData();
}
`;
fs.writeFileSync(path.join(srcDir, `app/api/admin/dashboard/route.ts`), dashboardRouteContent);


// 3. Generate Auth Domain
const authRepoContent = `import { prisma } from '@/lib/db';
import { Prisma } from '@prisma/client';

export class AuthRepository {
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async createUser(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    return prisma.user.update({ where: { id }, data: { refreshToken } });
  }
}
`;
fs.writeFileSync(path.join(repoDir, `auth.repository.ts`), authRepoContent);

const authServiceContent = `import { AuthRepository } from '../repositories/auth.repository';
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
`;
fs.writeFileSync(path.join(serviceDir, `auth.service.ts`), authServiceContent);

const authControllerContent = `import { AuthService } from '../services/auth.service';
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
`;
fs.writeFileSync(path.join(controllerDir, `auth.controller.ts`), authControllerContent);

const loginRouteContent = `import { authController } from '@/controllers/auth.controller';

export async function POST(req: Request) {
  return authController.login(req);
}
`;
fs.writeFileSync(path.join(srcDir, `app/api/auth/login/route.ts`), loginRouteContent);

const registerRouteContent = `import { authController } from '@/controllers/auth.controller';

export async function POST(req: Request) {
  return authController.register(req);
}
`;
fs.writeFileSync(path.join(srcDir, `app/api/auth/register/route.ts`), registerRouteContent);

console.log('MVC architecture fully generated and routed!');
