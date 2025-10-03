import mongoose from "mongoose";

const BeerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ["IPA", "Lager", "Stout", "Porter", "Pale Ale", "Other"], required: true },
    abv: { type: Number, required: true }, // Alcohol %
    color: { type: String }, // e.g. golden, dark
    price: { type: Number, required: true },
    description: { type: String },
    manufacturer: { type: mongoose.Schema.Types.ObjectId, ref: "Manufacturer", required: true }
}, { timestamps: true });

const Beer = mongoose.model("Beer", BeerSchema);

export default Beer;
