import fs from 'fs';
import path from 'path';

const apiDir = path.join(process.cwd(), 'src/app/api');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace imports
  content = content.replace(/import connectToDatabase from '@\/lib\/db';\n/g, '');
  content = content.replace(/import \w+ from '@\/models\/\w+';\n/g, '');
  
  if (!content.includes(`import { prisma, connectDB } from '@/lib/db';`)) {
    content = content.replace(/import { NextResponse } from 'next\/server';\n/, `import { NextResponse } from 'next/server';\nimport { prisma, connectDB } from '@/lib/db';\n`);
  }

  // Replace await connectToDatabase() with await connectDB()
  content = content.replace(/await connectToDatabase\(\);/g, 'await connectDB();');

  // Find operations
  content = content.replace(/Appointment\.find\(\)\.sort\(\{ createdAt: -1 \}\)\.limit\((.*?)\)/g, "prisma.appointment.findMany({ orderBy: { createdAt: 'desc' }, take: $1 })");
  
  content = content.replace(/Appointment\.find\(\)\.sort\(\{ createdAt: -1 \}\)/g, "prisma.appointment.findMany({ orderBy: { createdAt: 'desc' } })");
  content = content.replace(/Department\.find\(\)\.sort\(\{ createdAt: -1 \}\)/g, "prisma.department.findMany({ orderBy: { createdAt: 'desc' } })");
  content = content.replace(/Doctor\.find\(\)\.sort\(\{ createdAt: -1 \}\)/g, "prisma.doctor.findMany({ orderBy: { createdAt: 'desc' } })");
  content = content.replace(/Patient\.find\(\)\.sort\(\{ createdAt: -1 \}\)/g, "prisma.patient.findMany({ orderBy: { createdAt: 'desc' } })");
  content = content.replace(/Staff\.find\(\)\.sort\(\{ createdAt: -1 \}\)/g, "prisma.staff.findMany({ orderBy: { createdAt: 'desc' } })");
  
  // Create operations
  content = content.replace(/Appointment\.create\((.*?)\)/g, "prisma.appointment.create({ data: $1 })");
  content = content.replace(/Department\.create\((.*?)\)/g, "prisma.department.create({ data: $1 })");
  content = content.replace(/Doctor\.create\((.*?)\)/g, "prisma.doctor.create({ data: $1 })");
  content = content.replace(/Patient\.create\((.*?)\)/g, "prisma.patient.create({ data: $1 })");
  content = content.replace(/Staff\.create\((.*?)\)/g, "prisma.staff.create({ data: $1 })");

  // Count operations
  content = content.replace(/(\w+)\.countDocuments\(\)/g, (match, p1) => {
    return `prisma.${p1.toLowerCase()}.count()`;
  });

  // DeleteMany operations
  content = content.replace(/(\w+)\.deleteMany\(\{\}\)/g, (match, p1) => {
    return `prisma.${p1.toLowerCase()}.deleteMany({})`;
  });

  // InsertMany operations
  content = content.replace(/(\w+)\.insertMany\((.*?)\)/g, (match, p1, p2) => {
    return `prisma.${p1.toLowerCase()}.createMany({ data: ${p2} })`;
  });

  // Aggregate operations in dashboard
  if (content.includes('Appointment.aggregate')) {
    content = content.replace(
      /await Appointment\.aggregate\(\[\s*\{ \$match: \{ payment: 'Paid' \} \},\s*\{ \$group: \{ _id: null, total: \{ \$sum: '\$amount' \} \} \}\s*\]\)/g,
      `await prisma.appointment.aggregate({ where: { payment: 'Paid' }, _sum: { amount: true } })`
    );
    content = content.replace(/const totalRevenue = revenue\.length > 0 \? revenue\[0\]\.total : 0;/g, `const totalRevenue = revenue._sum.amount || 0;`);
  }

  // Auth routes (User model)
  content = content.replace(/import User from '@\/models\/User';\n/g, '');
  content = content.replace(/User\.findOne\(\{ email \}\)/g, "prisma.user.findUnique({ where: { email } })");
  content = content.replace(/User\.findOne\(\{ email: (.*?) \}\)/g, "prisma.user.findUnique({ where: { email: $1 } })");
  content = content.replace(/User\.create\(\{([\s\S]*?)\}\)/g, "prisma.user.create({ data: {$1} })");

  fs.writeFileSync(filePath, content, 'utf8');
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  }
}

walk(apiDir);
console.log('Done rewriting APIs!');
