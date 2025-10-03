import mongoose from "mongoose";

const ManufacturerSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    founded: { type: Number }, // year
    country: { type: String },
    description: { type: String },
    logoUrl: { type: String }
}, { timestamps: true });

const Manufacturer = mongoose.model("Manufacturer", ManufacturerSchema);
export default Manufacturer;
