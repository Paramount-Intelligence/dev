const mongoose = require("mongoose");

const roles = ["Frontend", "Backend", "Fullstack"];
const statuses = ["Applied", "Interviewing", "Hired", "Rejected"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const internSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [emailPattern, "Please provide a valid email address"]
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: {
        values: roles,
        message: "Role must be Frontend, Backend, or Fullstack"
      }
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: {
        values: statuses,
        message: "Status must be Applied, Interviewing, Hired, or Rejected"
      }
    },
    score: {
      type: Number,
      required: [true, "Score is required"],
      min: [0, "Score must be at least 0"],
      max: [100, "Score must be at most 100"]
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("Intern", internSchema);
