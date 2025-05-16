const { PrismaClient, Role, JobType } = require('../src/generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Запуск заполнения базы данных...');

  // Clean up existing data (optional, comment out if you don't want to delete existing data)
  await prisma.application.deleteMany({});
  await prisma.resume.deleteMany({});
  await prisma.vacancy.deleteMany({});
  await prisma.student.deleteMany({});
  await prisma.employer.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.category.deleteMany({});

  console.log('База данных очищена');

  // Create categories
  const categories = [
    { name: 'Разработка программного обеспечения' },
    { name: 'Наука о данных и аналитика' },
    { name: 'Дизайн и UX' },
    { name: 'Управление продуктом' },
    { name: 'Маркетинг и коммуникации' },
    { name: 'Сети и инфраструктура' },
    { name: 'Финансы и банковское дело' },
    { name: 'Клиентская поддержка' },
    { name: 'Бизнес и менеджмент' },
    { name: 'Авиация и транспорт' },
  ];

  const createdCategories = {};

  for (const categoryData of categories) {
    const category = await prisma.category.create({
      data: categoryData,
    });
    createdCategories[categoryData.name] = category.id;
    console.log(`Создана категория: ${category.name}`);
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
  console.log(`Создан администратор: ${admin.username}`);

  // Create student users
  const students = [
    {
      username: 'student1',
      email: 'student1@example.com',
      password: 'password123',
      firstName: 'Aisha',
      lastName: 'Nurpeisova',
      university: 'Nazarbayev University',
      major: 'Компьютерные науки',
      graduationYear: 2025,
    },
    {
      username: 'student2',
      email: 'student2@example.com',
      password: 'password123',
      firstName: 'Azamat',
      lastName: 'Tulegenov',
      university: 'KBTU',
      major: 'Информационные системы',
      graduationYear: 2024,
    },
    {
      username: 'student3',
      email: 'student3@example.com',
      password: 'password123',
      firstName: 'Elena',
      lastName: 'Kim',
      university: 'AITU',
      major: 'Программная инженерия',
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
    console.log(`Создан студент: ${student.username}`);

    // Create resume for each student
    await prisma.resume.create({
      data: {
        studentId: student.student.id,
        experience: `Проходил стажировку в различных компаниях в области ${studentData.major}.`,
        skills: `Языки программирования, фреймворки, решение проблем, командная работа, коммуникация, управление проектами`,
        education: `Степень бакалавра по специальности ${studentData.major} в ${studentData.university}, ожидаемый год выпуска ${studentData.graduationYear}.`,
        about: `Страстный студент направления ${studentData.major}, стремящийся применить академические знания на практике.`,
      },
    });
    console.log(`Создано резюме для: ${student.username}`);
  }

  // Create employer users
  const employers = [
    {
      username: 'kaspi',
      email: 'careers@kaspi.kz',
      password: 'password123',
      companyName: 'Kaspi Банк',
      industry: 'Финансы и Технологии',
      website: 'https://kaspi.kz',
    },
    {
      username: 'kolesa',
      email: 'hr@kolesa.kz',
      password: 'password123',
      companyName: 'Колеса Групп',
      industry: 'Интернет и Технологии',
      website: 'https://kolesa.kz',
    },
    {
      username: 'beeline',
      email: 'jobs@beeline.kz',
      password: 'password123',
      companyName: 'Билайн Казахстан',
      industry: 'Телекоммуникации',
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
    console.log(`Создан работодатель: ${employer.username}`);

    // Create vacancies for each employer
    if (employerData.username === 'kaspi') {
      vacancies.push(
        {
          title: 'Backend-разработчик',
          description:
            'Мы ищем опытного Backend-разработчика со знанием Java, Spring и микросервисной архитектуры.',
          location: 'Алматы',
          salary: '800 000 - 1 200 000 KZT',
          jobType: JobType.FULL_TIME,
          employerId: employer.employer.id,
        },
        {
          title: 'DevOps-инженер',
          description:
            'Присоединяйтесь к нашей команде DevOps для управления облачной инфраструктурой, CI/CD и автоматизации процессов развертывания.',
          location: 'Алматы',
          salary: '1 000 000 - 1 500 000 KZT',
          jobType: JobType.FULL_TIME,
          employerId: employer.employer.id,
        },
      );
    } else if (employerData.username === 'kolesa') {
      vacancies.push(
        {
          title: 'Frontend-разработчик (React)',
          description:
            'Присоединяйтесь к нашей команде для разработки адаптивных и интерактивных веб-приложений с использованием React и других современных технологий.',
          location: 'Алматы',
          salary: '600 000 - 900 000 KZT',
          jobType: JobType.FULL_TIME,
          employerId: employer.employer.id,
        },
        {
          title: 'UX/UI Дизайнер-стажер',
          description:
            'Отличная возможность для студентов-дизайнеров получить реальный опыт работы в быстроразвивающейся технологической компании.',
          location: 'Алматы',
          salary: '250 000 - 350 000 KZT',
          jobType: JobType.INTERNSHIP,
          employerId: employer.employer.id,
        },
      );
    } else if (employerData.username === 'beeline') {
      vacancies.push(
        {
          title: 'Аналитик данных',
          description:
            'Ищем аналитика данных, который поможет нам извлекать инсайты из данных клиентов и улучшать наши предложения.',
          location: 'Алматы/Удаленно',
          salary: '600 000 - 800 000 KZT',
          jobType: JobType.REMOTE,
          employerId: employer.employer.id,
        },
        {
          title: 'Сетевой инженер (Частичная занятость)',
          description:
            'Нужен опытный сетевой инженер для поддержки нашей инфраструктурной команды на частичной занятости.',
          location: 'Нур-Султан',
          salary: '400 000 - 500 000 KZT',
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
      companyName: 'Эйр Астана',
      industry: 'Авиация',
      website: 'https://airastana.com',
    },
    {
      username: 'halykbank',
      email: 'hr@halykbank.kz',
      password: 'password123',
      companyName: 'Народный Банк',
      industry: 'Банковское дело',
      website: 'https://halykbank.kz',
    },
    {
      username: 'techgarden',
      email: 'jobs@techgarden.kz',
      password: 'password123',
      companyName: 'Астана Хаб',
      industry: 'Технологии',
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
    console.log(`Создан работодатель: ${employer.username}`);

    // Add vacancies for new employers
    if (employerData.username === 'airastana') {
      vacancies.push(
        {
          title: 'Аналитик данных операционных процессов',
          description:
            'Анализируйте данные операционных процессов, чтобы оптимизировать маршруты и повышать эффективность.',
          location: 'Алматы',
          salary: '700 000 - 900 000 KZT',
          jobType: JobType.FULL_TIME,
          employerId: employer.employer.id,
        },
        {
          title: 'Специалист технической поддержки',
          description: 'Обеспечьте техническую поддержку для внутренних систем и сотрудников.',
          location: 'Нур-Султан',
          salary: '500 000 - 650 000 KZT',
          jobType: JobType.FULL_TIME,
          employerId: employer.employer.id,
        },
      );
    } else if (employerData.username === 'halykbank') {
      vacancies.push(
        {
          title: 'Разработчик мобильных приложений',
          description:
            'Разрабатывайте и поддерживайте наши мобильные банковские приложения для iOS и Android.',
          location: 'Алматы',
          salary: '750 000 - 1 100 000 KZT',
          jobType: JobType.FULL_TIME,
          employerId: employer.employer.id,
        },
        {
          title: 'Специалист по кибербезопасности',
          description:
            'Защищайте наши цифровые активы и обеспечивайте соответствие стандартам безопасности.',
          location: 'Алматы',
          salary: '900 000 - 1 300 000 KZT',
          jobType: JobType.FULL_TIME,
          employerId: employer.employer.id,
        },
        {
          title: 'Стажер в финансовом отделе',
          description:
            'Изучайте банковские операции и финансовый анализ в практической обстановке.',
          location: 'Нур-Султан',
          salary: '200 000 - 300 000 KZT',
          jobType: JobType.INTERNSHIP,
          employerId: employer.employer.id,
        },
      );
    } else if (employerData.username === 'techgarden') {
      vacancies.push(
        {
          title: 'Наставник стартапов',
          description:
            'Направляйте стартапы на ранних стадиях через разработку продукта и выход на рынок.',
          location: 'Удаленно',
          salary: '500 000 - 800 000 KZT',
          jobType: JobType.PART_TIME,
          employerId: employer.employer.id,
        },
        {
          title: 'Менеджер по продукту',
          description:
            'Возглавьте разработку продукта для стартапов нашей акселерационной программы.',
          location: 'Нур-Султан',
          salary: '900 000 - 1 300 000 KZT',
          jobType: JobType.FULL_TIME,
          employerId: employer.employer.id,
        },
        {
          title: 'Специалист по росту',
          description: 'Разрабатывайте и внедряйте стратегии роста для наших портфельных компаний.',
          location: 'Удаленно',
          salary: '700 000 - 900 000 KZT',
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
          title: 'QA-инженер мобильных приложений',
          description:
            'Обеспечьте качество наших мобильных приложений через тщательное тестирование и процессы контроля качества.',
          location: 'Алматы',
          salary: '600 000 - 850 000 KZT',
          jobType: JobType.FULL_TIME,
          employerId: employer.id,
        },
        {
          title: 'Менеджер по продукту - Платежи',
          description: 'Возглавьте разработку и стратегию наших платежных решений.',
          location: 'Алматы',
          salary: '1 200 000 - 1 800 000 KZT',
          jobType: JobType.FULL_TIME,
          employerId: employer.id,
        },
        {
          title: 'Стажер по науке о данных',
          description:
            'Применяйте машинное обучение и статистический анализ, чтобы помочь нам принимать решения на основе данных.',
          location: 'Алматы',
          salary: '300 000 - 400 000 KZT',
          jobType: JobType.INTERNSHIP,
          employerId: employer.id,
        },
      );
    } else if (user.username === 'kolesa') {
      vacancies.push(
        {
          title: 'Backend-разработчик (Python)',
          description:
            'Разрабатывайте и поддерживайте серверные сервисы с использованием Python, Django и смежных технологий.',
          location: 'Алматы',
          salary: '700 000 - 1 100 000 KZT',
          jobType: JobType.FULL_TIME,
          employerId: employer.id,
        },
        {
          title: 'DevOps-инженер (Удаленно)',
          description:
            'Управляйте нашей облачной инфраструктурой и улучшайте наш CI/CD процесс из любой точки Казахстана.',
          location: 'Удаленно',
          salary: '900 000 - 1 300 000 KZT',
          jobType: JobType.REMOTE,
          employerId: employer.id,
        },
        {
          title: 'Специалист по контентному маркетингу',
          description:
            'Создавайте привлекательный контент для наших цифровых платформ и маркетинговых кампаний.',
          location: 'Алматы',
          salary: '500 000 - 700 000 KZT',
          jobType: JobType.CONTRACT,
          employerId: employer.id,
        },
      );
    } else if (user.username === 'beeline') {
      vacancies.push(
        {
          title: 'Инженер-телекоммуникаций',
          description: 'Проектируйте и оптимизируйте инфраструктуру мобильной сети.',
          location: 'Шымкент',
          salary: '700 000 - 900 000 KZT',
          jobType: JobType.FULL_TIME,
          employerId: employer.id,
        },
        {
          title: 'Менеджер по цифровому маркетингу',
          description: 'Возглавьте наши усилия в области цифрового маркетинга на всех каналах.',
          location: 'Алматы',
          salary: '800 000 - 1 200 000 KZT',
          jobType: JobType.FULL_TIME,
          employerId: employer.id,
        },
        {
          title: 'Специалист по поддержке клиентов (Частичная занятость)',
          description:
            'Обеспечьте отличный уровень обслуживания клиентов по телефону и цифровым каналам.',
          location: 'Караганда',
          salary: '300 000 - 450 000 KZT',
          jobType: JobType.PART_TIME,
          employerId: employer.id,
        },
        {
          title: 'Разработчик IoT-решений',
          description:
            'Разрабатывайте инновационные решения в области Интернета вещей для наших корпоративных клиентов.',
          location: 'Удаленно',
          salary: '900 000 - 1 300 000 KZT',
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
      vacancyData.title.includes('разработчик') ||
      vacancyData.title.includes('DevOps') ||
      vacancyData.title.includes('QA') ||
      vacancyData.title.includes('инженер')
    ) {
      categoryId = createdCategories['Разработка программного обеспечения'];
    } else if (
      vacancyData.title.includes('данных') ||
      vacancyData.title.includes('аналитик') ||
      vacancyData.title.includes('наука о данных')
    ) {
      categoryId = createdCategories['Наука о данных и аналитика'];
    } else if (
      vacancyData.title.includes('Дизайнер') ||
      vacancyData.title.includes('дизайнер') ||
      vacancyData.title.includes('UX') ||
      vacancyData.title.includes('UI')
    ) {
      categoryId = createdCategories['Дизайн и UX'];
    } else if (
      vacancyData.title.includes('Менеджер по продукту') ||
      vacancyData.title.includes('менеджер по продукту')
    ) {
      categoryId = createdCategories['Управление продуктом'];
    } else if (vacancyData.title.includes('маркетинг') || vacancyData.title.includes('контент')) {
      categoryId = createdCategories['Маркетинг и коммуникации'];
    } else if (
      vacancyData.title.includes('Сеть') ||
      vacancyData.title.includes('сеть') ||
      vacancyData.title.includes('инфраструктура') ||
      vacancyData.title.includes('телекоммуникаций')
    ) {
      categoryId = createdCategories['Сети и инфраструктура'];
    } else if (vacancyData.title.includes('финанс') || vacancyData.title.includes('банк')) {
      categoryId = createdCategories['Финансы и банковское дело'];
    } else if (vacancyData.title.includes('поддержка') || vacancyData.title.includes('клиент')) {
      categoryId = createdCategories['Клиентская поддержка'];
    } else if (vacancyData.title.includes('менеджер') || vacancyData.title.includes('наставник')) {
      categoryId = createdCategories['Бизнес и менеджмент'];
    } else if (vacancyData.title.includes('авиа') || vacancyData.title.includes('транспорт')) {
      categoryId = createdCategories['Авиация и транспорт'];
    } else {
      // Default category for anything else
      categoryId = createdCategories['Бизнес и менеджмент'];
    }

    const vacancy = await prisma.vacancy.create({
      data: {
        ...vacancyData,
        categoryId: categoryId,
      },
    });
    console.log(`Создана вакансия: ${vacancy.title}`);
  }

  console.log('Заполнение базы данных завершено успешно');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
