import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  phone: { type: String, required: true },
  pAvatar: { type: String },
  doctorName: { type: String, required: true },
  docQual: { type: String },
  dAvatar: { type: String },
  dept: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, required: true },
  payment: { type: String, required: true },
  amount: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);
