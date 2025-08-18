const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

// User Schema (renamed from userSchema to signupSchema)
const userSchema = new mongoose.Schema(
  {
    F_name: { type: String, required: true },
    L_name: { type: String, required: true },
    G_mail: { type: String, required: true, unique: true },
    Phonenumber: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin"] },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    emailVerificationCode: { type: String },
  },
  { timestamps: true }
);

const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mystory: { type: String, required: true },
    education: [
      {
        degree: { type: String },
        school: { type: String },
        year: { type: String },
        gpa: { type: String },
        description: { type: String }
      }
    ],
    hobby: [{ type: String }], 
    achievements: [{ type: String }],
    isactive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", aboutSchema);


// Project Schema
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Signup", required: true }, 
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String },
    image: { type: String }, // emoji or URL
    tech: [{ type: String }], // array of technologies used
    category: { type: String }, // web, mobile, ai, etc.
    status: { type: String, enum: ["completed", "in-progress"] }, // restrict to valid values
    github: { type: String },
    demo: { type: String },
    date: { type: String }, // could use Date, but you're using "2023" or "2024"
    team: { type: String },
    highlights: [{ type: String }],
    isactive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);




const contractSchema = new mongoose.Schema(
  {
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Signup", required: true }, // Changed from "User" to "Signup"
    engineerId: { type: mongoose.Schema.Types.ObjectId, ref: "Signup", required: true }, // Changed from "User" to "Signup"
    clientSignature: { type: String, default: null },
    engineerSignature: { type: String, default: null },
    title: { type: String, ref: "Project"  },
    landArea: { type: Number, ref: "Project" },
    buildingType: { type: String, ref: "Project"},
    budget: { type: Number,  ref: "Project" },
    timeline: { type: String,  ref: "Project"},
    termsConditions: { type: String, required: true },
    status: {
      type: String,
      ref: "Project",
      enum: ["pending", "signed", "active", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Message Schema
const messageSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "Signup", required: true }, // Changed from "User" to "Signup"
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "Signup", required: true }, // Changed from "User" to "Signup"
    content: { type: String, required: true },
  },
  { timestamps: true }
);

// Review Schema
const reviewSchema = new mongoose.Schema(
  {
    toUserId: { type: mongoose.Schema.Types.ObjectId, ref: "Signup", required: true }, // Engineer being reviewed
    fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: "Signup", required: true }, // User giving the review
    reviewText: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true }
  },
  { timestamps: true }
);

// Models
const Signup = mongoose.model("Signup", signupSchema);  // Changed from User to Signup
const Project = mongoose.model("Project", projectSchema);
const Contract = mongoose.model("Contract", contractSchema);
const Message = mongoose.model("Message", messageSchema);
const Review = mongoose.model("Review", reviewSchema);


// Export Models
module.exports = { userSchema, Project, Contract, Message, Review };
