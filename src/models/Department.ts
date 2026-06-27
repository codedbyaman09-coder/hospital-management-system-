import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  head: { type: String, required: true },
  iconName: { type: String, default: 'Building' },
  color: { type: String, default: 'text-blue-500' },
  bg: { type: String, default: 'bg-blue-50' },
  staff: { type: Number, default: 0 },
  activePatients: { type: Number, default: 0 },
  status: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Department || mongoose.model('Department', DepartmentSchema);
