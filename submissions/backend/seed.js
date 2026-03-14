require('dotenv').config();
const mongoose = require('mongoose');
const Intern = require('./models/Intern');
const connectDB = require('./config/db');

const seedData = [
  { name: 'Alice Johnson',  email: 'alice@example.com',  role: 'Frontend',  status: 'Hired',        score: 92 },
  { name: 'Bob Smith',      email: 'bob@example.com',    role: 'Backend',   status: 'Interviewing', score: 78 },
  { name: 'Carol White',    email: 'carol@example.com',  role: 'Fullstack', status: 'Applied',      score: 65 },
  { name: 'David Lee',      email: 'david@example.com',  role: 'Backend',   status: 'Rejected',     score: 40 },
  { name: 'Eva Martinez',   email: 'eva@example.com',    role: 'Frontend',  status: 'Interviewing', score: 85 },
  { name: 'Frank Brown',    email: 'frank@example.com',  role: 'Fullstack', status: 'Hired',        score: 95 },
  { name: 'Grace Kim',      email: 'grace@example.com',  role: 'Frontend',  status: 'Applied',      score: 70 },
  { name: 'Henry Davis',    email: 'henry@example.com',  role: 'Backend',   status: 'Applied',      score: 55 },
  { name: 'Isla Wilson',    email: 'isla@example.com',   role: 'Fullstack', status: 'Interviewing', score: 88 },
  { name: 'Jack Taylor',    email: 'jack@example.com',   role: 'Frontend',  status: 'Hired',        score: 91 },
  { name: 'Karen Moore',    email: 'karen@example.com',  role: 'Backend',   status: 'Rejected',     score: 33 },
  { name: 'Liam Anderson',  email: 'liam@example.com',   role: 'Fullstack', status: 'Applied',      score: 74 },
];

const seed = async () => {
  await connectDB();

  await Intern.deleteMany({});
  console.log('🗑️  Cleared existing interns\n');

  const created = await Intern.insertMany(seedData);
  console.log(`✅ Seeded ${created.length} interns:\n`);
  created.forEach((i) =>
    console.log(`   ${i.name.padEnd(16)} | ${i.role.padEnd(10)} | ${i.status.padEnd(12)} | Score: ${i.score}`)
  );

  await mongoose.connection.close();
  console.log('\n🔌 Connection closed. Seed complete!');
};

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
