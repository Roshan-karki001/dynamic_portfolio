const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

// ===================== user/User Schema =====================
const userSchema = new mongoose.Schema(
  {
    F_name: { type: String, required: true },
    L_name: { type: String, required: true },
    G_mail: { type: String, required: true, unique: true },
    Phonenumber: { type: String, required: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
    profilePicture: { type: String, default: null },
    role: { type: String, required: true, enum: ["admin"] },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    emailVerificationCode: { type: String },
  },
  { timestamps: true }
);

// ===================== About Schema =====================
const aboutSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    Mystory: { type: String, required: true },
    education: [{ type: mongoose.Schema.Types.ObjectId, ref: "Education", required: true }],
    Achievement: { type: String, required: true },
    Intrest_Hobbies: { type: String, required: true },
  },
  { timestamps: true }
);

// ===================== Education Schema =====================
const educationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    degree: { type: String, required: true },
    School: { type: String, required: true },
    year: { type: String, required: true },
    gpa: { type: String, required: true },
    description: { type: String, required: true },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ===================== Skill Schema =====================
const skillSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    title: { type: String, required: true },
    level: { type: Number, required: true, max: 100 }, // percentage
    category: { 
      type: String, 
      enum: ["Programming Languages", "Frontend Development", "Backend Development", "Cloud & DevOps"],
      required: true 
    },
    Certificate: { type: String },
    tools_technology: { type: String, required: true },
    currently_learning: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ===================== Project Schema =====================
const projectSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String, required: true },
    image: { type: String, default: null },
    tech: [{ type: String, required: true }],
    category: { type: String, enum: ["webapp", "mobile app", "backend", "tools"], required: true },
    status: { type: String, enum: ["completed", "progress"], default: "progress" },
    github: { type: String, default: null },
    Date: { type: Date, required: true },
    Team: { type: String, required: true },
    Highlights: [{ type: String, required: true }],
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ===================== Contact Schema =====================
const contactSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    socialMedia: [
      {
        platform: { type: String, required: true },
        link: { type: String, required: true }
      }
    ]
  },
  { timestamps: true }
);



// ===================== Models =====================
const user = mongoose.model("user", userSchema);
const About = mongoose.model("About", aboutSchema);
const Education = mongoose.model("Education", educationSchema);
const Skill = mongoose.model("Skill", skillSchema);
const Project = mongoose.model("Project", projectSchema);
const Contact = mongoose.model("Contact", contactSchema);


// ===================== Exports =====================
module.exports = { 
  user, About, Education, Skill, Project, Contact};
