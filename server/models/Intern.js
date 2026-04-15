const mongoose = require("mongoose");

const internSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
    },
    role: {
      type: String,
      enum: ["Frontend", "Backend", "Fullstack"],
      required: [true, "Role is required"]
    },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Accepted", "Rejected"],
      required: [true, "Status is required"]
    },
    score: {
      type: Number,
      min: [0, "Score must be at least 0"],
      max: [100, "Score cannot exceed 100"],
      required: [true, "Score is required"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Intern", internSchema);
