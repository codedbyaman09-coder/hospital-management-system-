import mongoose from 'mongoose';

const StaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  avatar: { type: String, default: 'https://i.pravatar.cc/150' },
  role: { type: String, required: true },
  department: { type: String, required: true },
  shift: { type: String, required: true },
  status: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Staff || mongoose.model('Staff', StaffSchema);
