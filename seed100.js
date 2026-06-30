const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const firstNames = ['Ali', 'Fatima', 'Ahmed', 'Ayesha', 'Bilal', 'Zainab', 'Usman', 'Sana', 'Hassan', 'Khadija', 'Omar', 'Maryam', 'Tariq', 'Hira', 'Kamran', 'Sadia', 'Farhan', 'Nida', 'Imran', 'Rabia'];
const lastNames = ['Raza', 'Noor', 'Hassan', 'Malik', 'Tariq', 'Khan', 'Ali', 'Shah', 'Qureshi', 'Ahmed', 'Sheikh', 'Iqbal', 'Mahmood', 'Abbas', 'Javed', 'Akhtar', 'Baqir', 'Jamil', 'Zafar', 'Habib'];
const deptsList = ['Cardiology', 'Neurology', 'Orthopedics', 'Dermatology', 'Pediatrics', 'Oncology', 'Radiology', 'General Surgery', 'Psychiatry', 'Urology'];
const statuses = ['Active', 'Inactive', 'Critical', 'On Leave'];
const genders = ['Male', 'Female'];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function seed100() {
  console.log('Connecting to database...');

  console.log('Generating 100 Departments...');
  const departments = [];
  for (let i = 0; i < 100; i++) {
    departments.push({
      name: `${getRandom(deptsList)} Unit ${i + 1}`,
      head: `Dr. ${getRandom(firstNames)} ${getRandom(lastNames)}`,
      iconName: 'Activity',
      color: 'text-blue-500',
      bg: 'bg-blue-50',
      staff: getRandomInt(5, 50),
      activePatients: getRandomInt(10, 200),
      status: 'Active'
    });
  }
  await prisma.department.createMany({ data: departments });

  console.log('Generating 100 Doctors...');
  const doctors = [];
  for (let i = 0; i < 100; i++) {
    const fn = getRandom(firstNames);
    const ln = getRandom(lastNames);
    doctors.push({
      name: `Dr. ${fn} ${ln}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@citycare.com`,
      phone: `+92 3${getRandomInt(0, 4)}0 ${getRandomInt(1000000, 9999999)}`,
      avatar: `https://i.pravatar.cc/150?u=doc${i}`,
      dept: getRandom(deptsList),
      qual: 'MBBS, FCPS',
      experience: getRandomInt(2, 25),
      status: getRandom(statuses)
    });
  }
  await prisma.doctor.createMany({ data: doctors });

  console.log('Generating 100 Patients...');
  const patients = [];
  for (let i = 0; i < 100; i++) {
    const fn = getRandom(firstNames);
    const ln = getRandom(lastNames);
    patients.push({
      name: `${fn} ${ln}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@patient.com`,
      phone: `+92 3${getRandomInt(0, 4)}0 ${getRandomInt(1000000, 9999999)}`,
      avatar: `https://i.pravatar.cc/150?u=pat${i}`,
      gender: getRandom(genders),
      age: getRandomInt(5, 80),
      bloodGroup: getRandom(bloodGroups),
      lastVisit: `May ${getRandomInt(1, 28)}, 2024`,
      status: getRandom(statuses)
    });
  }
  await prisma.patient.createMany({ data: patients });

  console.log('Generating 100 Staff...');
  const staff = [];
  for (let i = 0; i < 100; i++) {
    const fn = getRandom(firstNames);
    const ln = getRandom(lastNames);
    staff.push({
      name: `${fn} ${ln}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@citycare.com`,
      phone: `+92 3${getRandomInt(0, 4)}0 ${getRandomInt(1000000, 9999999)}`,
      avatar: `https://i.pravatar.cc/150?u=staff${i}`,
      role: getRandom(['Nurse', 'Technician', 'Receptionist', 'Cleaner', 'Admin']),
      department: getRandom(deptsList),
      shift: getRandom(['Morning', 'Evening', 'Night']),
      status: getRandom(statuses)
    });
  }
  await prisma.staff.createMany({ data: staff });

  console.log('Generating 100 Appointments...');
  const appointments = [];
  for (let i = 0; i < 100; i++) {
    const fn = getRandom(firstNames);
    const ln = getRandom(lastNames);
    const docFn = getRandom(firstNames);
    const docLn = getRandom(lastNames);
    appointments.push({
      patientName: `${fn} ${ln}`,
      phone: `+92 3${getRandomInt(0, 4)}0 ${getRandomInt(1000000, 9999999)}`,
      pAvatar: `https://i.pravatar.cc/150?u=patApp${i}`,
      doctorName: `Dr. ${docFn} ${docLn}`,
      docQual: 'MBBS, MD',
      dAvatar: `https://i.pravatar.cc/150?u=docApp${i}`,
      dept: getRandom(deptsList),
      date: `May ${getRandomInt(1, 28)}, 2024`,
      time: `10:00 AM`,
      status: getRandom(['Confirmed', 'Pending', 'Completed', 'Cancelled']),
      payment: getRandom(['Paid', 'Unpaid', 'Refunded']),
      amount: getRandomInt(1000, 5000)
    });
  }
  await prisma.appointment.createMany({ data: appointments });

  console.log('Successfully inserted 100 records in all tables!');
}

seed100().catch(console.error).finally(() => prisma.$disconnect());
