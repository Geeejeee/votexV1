const mongoose = require('mongoose');
const User = require('./schemas/userSchema.js'); // adjust path if needed
const { hashPassword } = require('./utils/authUtils.js'); // your existing hash function

const MONGO_URI = 'mongodb+srv://admin:tD5TRlkYtGKrbrKg@cluster0.afydv.mongodb.net/voting_system?retryWrites=true&w=majority&appName=Cluster0'; // or use dotenv

const resetPassword = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    const newPassword = 'password123'; // your new password
    const hashed = await hashPassword(newPassword);

    const updated = await User.findOneAndUpdate(
      { email: 'admin@gmail.com' }, // replace with your admin's email
      { password: hashed },
      { new: true }
    );

    if (updated) {
      console.log('✅ Password updated for admin:', updated.email);
    } else {
      console.log('❌ Admin not found.');
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error resetting password:', err.message);
  }
};

resetPassword();
