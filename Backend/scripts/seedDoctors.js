require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const roster = {
  "Cardiology": ["Aarav Mehta", "Kavya Rao"], "Cardiac Surgery": ["Rohan Sen", "Nisha Kapoor"],
  "Orthopedics": ["Ishaan Das", "Meera Nair"], "Neurology": ["Arjun Patel", "Sana Khan"],
  "Neurosurgery": ["Vikram Joshi", "Ananya Bose"], "Pediatrics": ["Riya Sharma", "Kabir Roy"],
  "Gynecology": ["Aditi Iyer", "Priya Menon"], "General Medicine": ["Neel Verma", "Pooja Sahu"],
  "Dermatology": ["Tara Kapoor", "Dev Malhotra"]
};
async function main() {
 if (!process.env.MONGO_URI) throw new Error("Set MONGO_URI in Backend/.env before seeding.");
 await mongoose.connect(process.env.MONGO_URI);
 const password = await bcrypt.hash("DemoDoctor123!", 12); let created = 0;
 for (const [department, names] of Object.entries(roster)) for (const name of names) {
   const email = `${name.toLowerCase().replace(/[^a-z]+/g,".").replace(/^\.|\.$/g,"")}@hms-demo.local`;
   const result = await User.updateOne({email}, {$setOnInsert:{name,email,password,role:"doctor",department}}, {upsert:true});
   if (result.upsertedCount) created++;
 }
 console.log(`Doctor seed complete. ${created} demo doctors added; existing accounts were preserved.`);
 console.log("Demo doctor password for seeded accounts: DemoDoctor123! (local demo only; change before any public deployment)");
 await mongoose.disconnect();
}
main().catch(async e=>{console.error(e.message); await mongoose.disconnect().catch(()=>{}); process.exit(1);});
