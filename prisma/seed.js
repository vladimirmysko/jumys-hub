const { PrismaClient, Role, JobType } = require('../src/generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Clean up existing data (optional, comment out if you don't want to delete existing data)
  await prisma.application.deleteMany({});
  await prisma.resume.deleteMany({});
  await prisma.vacancy.deleteMany({});
  await prisma.student.deleteMany({});
  await prisma.employer.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.category.deleteMany({});

  console.log('Database cleaned');

  // Create categories
  const categories = [
    { name: 'Software Development' },
    { name: 'Data Science & Analytics' },
    { name: 'Design & UX' },
    { name: 'Product Management' },
    { name: 'Marketing & Communications' },
    { name: 'Network & Infrastructure' },
    { name: 'Finance & Banking' },
    { name: 'Customer Support' },
    { name: 'Business & Management' },
    { name: 'Aviation & Transportation' },
  ];

  const createdCategories = {};

  for (const categoryData of categories) {
    const category = await prisma.category.create({
      data: categoryData,
    });
    createdCategories[categoryData.name] = category.id;
    console.log(`Created category: ${category.name}`);
  }

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@jumyshub.kz',
      password: adminPassword,
      role: Role.ADMIN,
      firstName: 'Admin',
      lastName: 'User',
    },
  });
  console.log(`Created admin user: ${admin.username}`);

  // Create student users
  const students = [
    {
      username: 'student1',
      email: 'student1@example.com',
      password: 'password123',
      firstName: 'Aisha',
      lastName: 'Nurpeisova',
      university: 'Nazarbayev University',
      major: 'Computer Science',
      graduationYear: 2025,
    },
    {
      username: 'student2',
      email: 'student2@example.com',
      password: 'password123',
      firstName: 'Azamat',
      lastName: 'Tulegenov',
      university: 'KBTU',
      major: 'Information Systems',
      graduationYear: 2024,
    },
    {
      username: 'student3',
      email: 'student3@example.com',
      password: 'password123',
      firstName: 'Elena',
      lastName: 'Kim',
      university: 'AITU',
      major: 'Software Engineering',
      graduationYear: 2026,
    },
  ];

  for (const studentData of students) {
    const hashedPassword = await bcrypt.hash(studentData.password, 10);
    const student = await prisma.user.create({
      data: {
        username: studentData.username,
        email: studentData.email,
        password: hashedPassword,
        role: Role.STUDENT,
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        student: {
          create: {
            university: studentData.university,
            major: studentData.major,
            graduationYear: studentData.graduationYear,
          },
        },
      },
      include: {
        student: true,
      },
    });
    console.log(`Created student user: ${student.username}`);

    // Create resume for each student
    await prisma.resume.create({
      data: {
        studentId: student.student.id,
        experience: `Worked as an intern at various companies in ${studentData.major} field.`,
        skills: `Programming languages, frameworks, problem-solving, teamwork, communication, project management`,
        education: `Bachelor's degree in ${studentData.major} from ${studentData.university}, expected to graduate in ${studentData.graduationYear}.`,
        about: `Passionate ${studentData.major} student eager to apply academic knowledge in a professional setting.`,
      },
    });
    console.log(`Created resume for: ${student.username}`);
  }

  // Create employer users
  const employers = [
    {
      username: 'kaspi',
      email: 'careers@kaspi.kz',
      password: 'password123',
      companyName: 'Kaspi Bank',
      industry: 'Finance & Technology',
      website: 'https://kaspi.kz',
    },
    {
      username: 'kolesa',
      email: 'hr@kolesa.kz',
      password: 'password123',
      companyName: 'Kolesa Group',
      industry: 'Internet & Technology',
      website: 'https://kolesa.kz',
    },
    {
      username: 'beeline',
      email: 'jobs@beeline.kz',
      password: 'password123',
      companyName: 'Beeline Kazakhstan',
      industry: 'Telecommunications',
      website: 'https://beeline.kz',
    },
  ];

  const vacancies = [];

  for (const employerData of employers) {
    const hashedPassword = await bcrypt.hash(employerData.password, 10);
    const employer = await prisma.user.create({
      data: {
        username: employerData.username,
        email: employerData.email,
        password: hashedPassword,
        role: Role.EMPLOYER,
        employer: {
          create: {
            companyName: employerData.companyName,
            industry: employerData.industry,
            website: employerData.website,
          },
        },
      },
      include: {
        employer: true,
      },
    });
    console.log(`Created employer user: ${employer.username}`);

    // Create vacancies for each employer
    if (employerData.username === 'kaspi') {
      vacancies.push(
        {
          title: 'Backend Developer',
          description:
            'We are looking for an experienced Backend Developer with knowledge of Java, Spring, and microservices architecture.',
          location: 'Almaty',
          salary: '800,000 - 1,200,000 KZT',
          jobType: JobType.FULL_TIME,
          employerId: employer.employer.id,
        },
        {
          title: 'DevOps Engineer',
          description:
            'Join our DevOps team to manage cloud infrastructure, CI/CD pipelines, and automate deployment processes.',
          location: 'Almaty',
          salary: '1,000,000 - 1,500,000 KZT',
          jobType: JobType.FULL_TIME,
          employerId: employer.employer.id,
        },
      );
    } else if (employerData.username === 'kolesa') {
      vacancies.push(
        {
          title: 'Frontend Developer (React)',
          description:
            'Join our team to develop responsive and interactive web applications using React and other modern frontend technologies.',
          location: 'Almaty',
          salary: '600,000 - 900,000 KZT',
          jobType: JobType.FULL_TIME,
          employerId: employer.employer.id,
        },
        {
          title: 'UX/UI Designer Intern',
          description:
            'Great opportunity for design students to gain real-world experience in a fast-paced tech company.',
          location: 'Almaty',
          salary: '250,000 - 350,000 KZT',
          jobType: JobType.INTERNSHIP,
          employerId: employer.employer.id,
        },
      );
    } else if (employerData.username === 'beeline') {
      vacancies.push(
        {
          title: 'Data Analyst',
          description:
            'Looking for a data analyst to help us derive insights from customer data and improve our service offerings.',
          location: 'Almaty/Remote',
          salary: '600,000 - 800,000 KZT',
          jobType: JobType.REMOTE,
          employerId: employer.employer.id,
        },
        {
          title: 'Network Engineer (Part-time)',
          description:
            'We need a skilled network engineer to support our infrastructure team on a part-time basis.',
          location: 'Nur-Sultan',
          salary: '400,000 - 500,000 KZT',
          jobType: JobType.PART_TIME,
          employerId: employer.employer.id,
        },
      );
    }
  }

  // Create additional employers
  const additionalEmployers = [
    {
      username: 'airastana',
      email: 'careers@airastana.com',
      password: 'password123',
      companyName: 'Air Astana',
      industry: 'Aviation',
      website: 'https://airastana.com',
    },
    {
      username: 'halykbank',
      email: 'hr@halykbank.kz',
      password: 'password123',
      companyName: 'Halyk Bank',
      industry: 'Banking',
      website: 'https://halykbank.kz',
    },
    {
      username: 'techgarden',
      email: 'jobs@techgarden.kz',
      password: 'password123',
      companyName: 'Astana Hub',
      industry: 'Technology',
      website: 'https://astanahub.com',
    },
  ];

  // Create additional employers
  for (const employerData of additionalEmployers) {
    const hashedPassword = await bcrypt.hash(employerData.password, 10);
    const employer = await prisma.user.create({
      data: {
        username: employerData.username,
        email: employerData.email,
        password: hashedPassword,
        role: Role.EMPLOYER,
        employer: {
          create: {
            companyName: employerData.companyName,
            industry: employerData.industry,
            website: employerData.website,
          },
        },
      },
      include: {
        employer: true,
      },
    });
    console.log(`Created employer user: ${employer.username}`);

    // Add vacancies for new employers
    if (employerData.username === 'airastana') {
      vacancies.push(
        {
          title: 'Flight Operations Data Analyst',
          description: 'Analyze flight operations data to optimize routes and improve efficiency.',
          location: 'Almaty',
          salary: '700,000 - 900,000 KZT',
          jobType: JobType.FULL_TIME,
          employerId: employer.employer.id,
        },
        {
          title: 'IT Support Specialist',
          description: 'Provide technical support for internal systems and staff.',
          location: 'Nur-Sultan',
          salary: '500,000 - 650,000 KZT',
          jobType: JobType.FULL_TIME,
          employerId: employer.employer.id,
        },
      );
    } else if (employerData.username === 'halykbank') {
      vacancies.push(
        {
          title: 'Mobile App Developer',
          description: 'Develop and maintain our mobile banking applications for iOS and Android.',
          location: 'Almaty',
          salary: '750,000 - 1,100,000 KZT',
          jobType: JobType.FULL_TIME,
          employerId: employer.employer.id,
        },
        {
          title: 'Cybersecurity Specialist',
          description: 'Protect our digital assets and ensure compliance with security standards.',
          location: 'Almaty',
          salary: '900,000 - 1,300,000 KZT',
          jobType: JobType.FULL_TIME,
          employerId: employer.employer.id,
        },
        {
          title: 'Finance Intern',
          description: 'Learn banking operations and financial analysis in a hands-on environment.',
          location: 'Nur-Sultan',
          salary: '200,000 - 300,000 KZT',
          jobType: JobType.INTERNSHIP,
          employerId: employer.employer.id,
        },
      );
    } else if (employerData.username === 'techgarden') {
      vacancies.push(
        {
          title: 'Startup Mentor',
          description:
            'Guide early-stage startups through product development and market fit challenges.',
          location: 'Remote',
          salary: '500,000 - 800,000 KZT',
          jobType: JobType.PART_TIME,
          employerId: employer.employer.id,
        },
        {
          title: 'Product Manager',
          description: 'Lead product development for our accelerator program startups.',
          location: 'Nur-Sultan',
          salary: '900,000 - 1,300,000 KZT',
          jobType: JobType.FULL_TIME,
          employerId: employer.employer.id,
        },
        {
          title: 'Growth Hacker',
          description: 'Develop and implement growth strategies for our portfolio companies.',
          location: 'Remote',
          salary: '700,000 - 900,000 KZT',
          jobType: JobType.REMOTE,
          employerId: employer.employer.id,
        },
      );
    }
  }

  // Add more vacancies to existing employers
  const existingEmployers = await prisma.employer.findMany({
    where: {
      user: {
        username: {
          in: ['kaspi', 'kolesa', 'beeline'],
        },
      },
    },
  });

  for (const employer of existingEmployers) {
    const user = await prisma.user.findUnique({
      where: { id: employer.userId },
    });

    if (user.username === 'kaspi') {
      vacancies.push(
        {
          title: 'Mobile App QA Engineer',
          description:
            'Ensure the quality of our mobile applications through thorough testing and quality assurance processes.',
          location: 'Almaty',
          salary: '600,000 - 850,000 KZT',
          jobType: JobType.FULL_TIME,
          employerId: employer.id,
        },
        {
          title: 'Product Manager - Payments',
          description: 'Lead the development and strategy for our payment solutions.',
          location: 'Almaty',
          salary: '1,200,000 - 1,800,000 KZT',
          jobType: JobType.FULL_TIME,
          employerId: employer.id,
        },
        {
          title: 'Data Science Intern',
          description:
            'Apply machine learning and statistical analysis to help us make data-driven decisions.',
          location: 'Almaty',
          salary: '300,000 - 400,000 KZT',
          jobType: JobType.INTERNSHIP,
          employerId: employer.id,
        },
      );
    } else if (user.username === 'kolesa') {
      vacancies.push(
        {
          title: 'Backend Developer (Python)',
          description:
            'Develop and maintain backend services using Python, Django, and related technologies.',
          location: 'Almaty',
          salary: '700,000 - 1,100,000 KZT',
          jobType: JobType.FULL_TIME,
          employerId: employer.id,
        },
        {
          title: 'DevOps Engineer (Remote)',
          description:
            'Manage our cloud infrastructure and improve our CI/CD pipeline from anywhere in Kazakhstan.',
          location: 'Remote',
          salary: '900,000 - 1,300,000 KZT',
          jobType: JobType.REMOTE,
          employerId: employer.id,
        },
        {
          title: 'Content Marketing Specialist',
          description: 'Create engaging content for our digital platforms and marketing campaigns.',
          location: 'Almaty',
          salary: '500,000 - 700,000 KZT',
          jobType: JobType.CONTRACT,
          employerId: employer.id,
        },
      );
    } else if (user.username === 'beeline') {
      vacancies.push(
        {
          title: 'Telecommunications Engineer',
          description: 'Design and optimize mobile network infrastructure.',
          location: 'Shymkent',
          salary: '700,000 - 900,000 KZT',
          jobType: JobType.FULL_TIME,
          employerId: employer.id,
        },
        {
          title: 'Digital Marketing Manager',
          description: 'Lead our digital marketing efforts across all channels.',
          location: 'Almaty',
          salary: '800,000 - 1,200,000 KZT',
          jobType: JobType.FULL_TIME,
          employerId: employer.id,
        },
        {
          title: 'Customer Support Specialist (Part-time)',
          description: 'Provide excellent customer service via phone and digital channels.',
          location: 'Karaganda',
          salary: '300,000 - 450,000 KZT',
          jobType: JobType.PART_TIME,
          employerId: employer.id,
        },
        {
          title: 'IoT Solutions Developer',
          description:
            'Develop innovative Internet of Things solutions for our enterprise clients.',
          location: 'Remote',
          salary: '900,000 - 1,300,000 KZT',
          jobType: JobType.REMOTE,
          employerId: employer.id,
        },
      );
    }
  }

  // Create all vacancies
  for (const vacancyData of vacancies) {
    // Assign a category based on the vacancy title/description
    let categoryId = null;

    if (
      vacancyData.title.includes('Developer') ||
      vacancyData.title.includes('DevOps') ||
      vacancyData.title.includes('QA Engineer')
    ) {
      categoryId = createdCategories['Software Development'];
    } else if (vacancyData.title.includes('Data') || vacancyData.title.includes('Analytics')) {
      categoryId = createdCategories['Data Science & Analytics'];
    } else if (
      vacancyData.title.includes('Designer') ||
      vacancyData.title.includes('UX') ||
      vacancyData.title.includes('UI')
    ) {
      categoryId = createdCategories['Design & UX'];
    } else if (
      vacancyData.title.includes('Product Manager') ||
      vacancyData.title.includes('Product')
    ) {
      categoryId = createdCategories['Product Management'];
    } else if (vacancyData.title.includes('Marketing') || vacancyData.title.includes('Content')) {
      categoryId = createdCategories['Marketing & Communications'];
    } else if (
      vacancyData.title.includes('Network') ||
      vacancyData.title.includes('Infrastructure') ||
      vacancyData.title.includes('IT Support')
    ) {
      categoryId = createdCategories['Network & Infrastructure'];
    } else if (vacancyData.title.includes('Finance') || vacancyData.title.includes('Banking')) {
      categoryId = createdCategories['Finance & Banking'];
    } else if (vacancyData.title.includes('Support') || vacancyData.title.includes('Customer')) {
      categoryId = createdCategories['Customer Support'];
    } else if (vacancyData.title.includes('Operations') || vacancyData.title.includes('Mentor')) {
      categoryId = createdCategories['Business & Management'];
    } else if (vacancyData.title.includes('Flight')) {
      categoryId = createdCategories['Aviation & Transportation'];
    } else {
      // Default category for anything else
      categoryId = createdCategories['Business & Management'];
    }

    const vacancy = await prisma.vacancy.create({
      data: {
        ...vacancyData,
        categoryId: categoryId,
      },
    });
    console.log(`Created vacancy: ${vacancy.title}`);
  }

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
