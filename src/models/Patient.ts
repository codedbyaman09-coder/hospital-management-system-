import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  avatar: { type: String, default: 'https://i.pravatar.cc/150' },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  bloodGroup: { type: String, required: true },
  lastVisit: { type: String, required: true },
  status: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Patient || mongoose.model('Patient', PatientSchema);
