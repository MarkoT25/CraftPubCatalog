import express from 'express';
import Manufacturer from '../models/manufacturer.model';

export const listManufacturers = async (req: express.Request, res: express.Response) => {
    try {
        const { search, sort = 'name', order = 'asc', page = 1, limit = 10 } = req.query;
        const filter: any = {};
        if (search) {
            filter.name = { $regex: search, $options: 'i' }; // case-insensitive search
        }

        const sortObject: any = {};
        sortObject[sort as string] = order === 'desc' ? -1 : 1;

        const pageNumber = Math.max(1, Number(page));
        const limitNumber = Math.max(1, Number(limit));
        const skip = (pageNumber - 1) * limitNumber;

        const manufacturers = await Manufacturer.find(filter)
            .sort(sortObject)
            .skip(skip)
            .limit(limitNumber);

        res.status(200).json({ message: "success", manufacturers });
    } catch (error: any) {
        res.status(500).json({
            message: `Error while fetching manufacturers: ${error.message}`
        });
    }
};

export const getManufacturerById = async (req: express.Request, res: express.Response) => {
    try {
        const manufacturerId = req.params.id;
        if (!manufacturerId) {
            return res.status(400).json({ message: "Manufacturer ID is required" });
        }
        const manufacturer = await Manufacturer.findById(manufacturerId);
        if (!manufacturer) {
            return res.status(404).json({ message: "Manufacturer not found" });
        }
        res.status(200).json({ message: "success", manufacturer });
    } catch (error: any) {
        res.status(500).json({ message: `Error while fetching manufacturer: ${error.message}` });
    }
};

export const createManufacturer = async (req: express.Request, res: express.Response) => {
    try {
        const { name, founded, country, description, logoUrl } = req.body;

        if (!name || !country || !founded) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const newManufacturer = new Manufacturer({
            name,
            country,
            founded,
            description,
            logoUrl
        });
        await newManufacturer.save();
        res.status(201).json({ message: "success", manufacturer: newManufacturer });
    } catch (error: any) {
        res.status(500).json({ message: `Error while creating manufacturer: ${error.message}` });
    }
};

export const updateManufacturer = async (req: express.Request, res: express.Response) => {
    try {
        const manufacturerId = req.params.id;
        if (!manufacturerId) {
            return res.status(400).json({ message: "Manufacturer ID is required" });
        }
        const { name, founded, country, description, logoUrl } = req.body;

        const updatedManufacturer = await Manufacturer.findByIdAndUpdate(
            manufacturerId,
            { name, founded, country, description, logoUrl },
            { new: true }
        );
        if (!updatedManufacturer) {
            return res.status(404).json({ message: "Manufacturer not found" });
        }
        res.status(200).json({ message: "success", manufacturer: updatedManufacturer });
    } catch (error: any) {
        res.status(500).json({ message: `Error while updating manufacturer: ${error.message}` });
    }
};


export const deleteManufacturer = async (req: express.Request, res: express.Response) => {
    try {
        const manufacturerId = req.params.id;
        if (!manufacturerId) {
            return res.status(400).json({ message: "Manufacturer ID is required" });
        }
        const deletedManufacturer = await Manufacturer.findByIdAndDelete(manufacturerId);
        if (!deletedManufacturer) {
            return res.status(404).json({ message: "Manufacturer not found" });
        }
        res.status(200).json({ message: "Manufacturer deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: `Error while deleting manufacturer: ${error.message}` });
    }
};


