const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Intern = require("./models/Intern");

dotenv.config();

const dummyInterns = [
  {
    name: "Ariq Pratama",
    email: "ariq.pratama@example.com",
    role: "Frontend",
    status: "Applied",
    score: 72
  },
  {
    name: "Nadia Putri",
    email: "nadia.putri@example.com",
    role: "Backend",
    status: "Interview",
    score: 81
  },
  {
    name: "Raka Firmansyah",
    email: "raka.firmansyah@example.com",
    role: "Fullstack",
    status: "Accepted",
    score: 93
  },
  {
    name: "Dina Maharani",
    email: "dina.maharani@example.com",
    role: "Frontend",
    status: "Rejected",
    score: 55
  },
  {
    name: "Bima Saputra",
    email: "bima.saputra@example.com",
    role: "Backend",
    status: "Applied",
    score: 68
  },
  {
    name: "Fira Anindita",
    email: "fira.anindita@example.com",
    role: "Fullstack",
    status: "Interview",
    score: 77
  },
  {
    name: "Gilang Permadi",
    email: "gilang.permadi@example.com",
    role: "Backend",
    status: "Accepted",
    score: 88
  },
  {
    name: "Salsa Oktaviani",
    email: "salsa.oktaviani@example.com",
    role: "Frontend",
    status: "Interview",
    score: 79
  },
  {
    name: "Yusuf Alfarizi",
    email: "yusuf.alfarizi@example.com",
    role: "Fullstack",
    status: "Applied",
    score: 74
  },
  {
    name: "Maya Kartika",
    email: "maya.kartika@example.com",
    role: "Backend",
    status: "Accepted",
    score: 90
  },
  {
    name: "Reza Nugroho",
    email: "reza.nugroho@example.com",
    role: "Frontend",
    status: "Interview",
    score: 83
  },
  {
    name: "Tasya Ramadhani",
    email: "tasya.ramadhani@example.com",
    role: "Fullstack",
    status: "Rejected",
    score: 58
  }
];

const seedInterns = async () => {
  try {
    await connectDB();

    await Intern.deleteMany({});
    await Intern.insertMany(dummyInterns);

    console.log("Dummy intern data seeded successfully.");
  } catch (error) {
    console.error("Seeding failed:", error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seedInterns();
