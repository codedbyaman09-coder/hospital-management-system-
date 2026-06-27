import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  avatar: { type: String, default: 'https://i.pravatar.cc/150' },
  dept: { type: String, required: true },
  qual: { type: String, required: true },
  experience: { type: Number, required: true },
  status: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);
