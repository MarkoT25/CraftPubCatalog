import express from 'express';
import Beer from '../models/beer.model';

export const listBeers = async (req: express.Request, res: express.Response) => {
    try {
        const {
            search,
            manufacturer,
            type,
            minPrice,
            maxPrice,

            // Sorting 
            sort = 'manufacturer',  // default: sort by manufacturer
            order = 'asc',          // alfabetical order

            // PAGINATION
            page = 1,
            limit = 10
        } = req.query;

        const filter: any = {};

        // Filters
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (manufacturer) {
            filter.manufacturer = manufacturer;
        }

        if (type) {
            filter.type = { $regex: type, $options: 'i' };
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        // Important: sorting by manufacturer requires special handling
        const sortObject: any = {};
        if (sort === 'manufacturer') {
            // Sorting by manufacturer.name requires populating the manufacturer field
            sortObject['manufacturer.name'] = order === 'desc' ? -1 : 1;
        } else {
            sortObject[sort as string] = order === 'desc' ? -1 : 1;
        }

        // Pagination
        const pageNumber = Math.max(1, Number(page));
        const limitNumber = Math.max(1, Number(limit));
        const skip = (pageNumber - 1) * limitNumber;

        // Query with population of manufacturer details
        const beers = await Beer.find(filter)
            .populate({
                path: 'manufacturer',
                select: 'name country foundedYear description logoUrl'
            })
            .sort(sortObject)
            .skip(skip)
            .limit(limitNumber);

        const totalBeers = await Beer.countDocuments(filter);
        const totalPages = Math.ceil(totalBeers / limitNumber);

        res.status(200).json({
            message: "success",
            beers: beers,
            pagination: {
                currentPage: pageNumber,
                totalPages: totalPages,
                totalItems: totalBeers,
                itemsPerPage: limitNumber,
                hasNextPage: pageNumber < totalPages,
                hasPrevPage: pageNumber > 1
            }
        });

    } catch (error: any) {
        res.status(500).json({
            message: `Error while fetching beers: ${error.message}`
        });
    }
};

export const getBeerById = async (req: express.Request, res: express.Response) => {
    try {
        const beerId = req.params.id;
        if (!beerId) {
            return res.status(400).json({ message: "Beer ID is required" });
        }
        const beer = await Beer.findById(beerId).populate({
            path: 'manufacturer',
            select: 'name country foundedYear description logoUrl'
        });
        if (!beer) {
            return res.status(404).json({ message: "Beer not found" });
        }
        res.status(200).json({ message: "success", beer });
    } catch (error: any) {
        res.status(500).json({ message: `Error while fetching beer: ${error.message}` });
    }
};

export const createBeer = async (req: express.Request, res: express.Response) => {
    try {
        const { name, type, abv, color, price, description, manufacturer } = req.body;


        if (!name || !type || !abv || !price || !manufacturer) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if (!["IPA", "Lager", "Stout", "Porter", "Pale Ale", "Other"].includes(type)) {
            return res.status(400).json({ message: "Invalid beer type" });
        }
        const newBeer = new Beer({
            name,
            type,
            abv,
            color,
            price,
            description,
            manufacturer
        });

        await newBeer.save();
        res.status(201).json({ message: "success", beer: newBeer });
    } catch (error: any) {
        res.status(500).json({ message: `Error while creating beer: ${error.message}` });
    }
};


export const updateBeer = async (req: express.Request, res: express.Response) => {
    try {
        const beerId = req.params.id;
        const updateData = req.body;

        if (!beerId) {
            return res.status(400).json({ message: "Beer ID is required" });
        }
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "No data provided for update" });
        }
        const validFields = ['name', 'type', 'abv', 'color', 'price', 'description', 'manufacturer'];
        const hasInvalidFields = Object.keys(updateData).some(field => !validFields.includes(field));

        if (hasInvalidFields) {
            return res.status(400).json({ message: "Invalid fields provided for update" });
        }

        const updatedBeer = await Beer.findByIdAndUpdate(beerId, updateData, { new: true });
        if (!updatedBeer) {
            return res.status(404).json({ message: "Beer not found" });
        }
        res.status(200).json({ message: "success", beer: updatedBeer });
    } catch (error: any) {
        res.status(500).json({ message: `Error while updating beer: ${error.message}` });
    }
};


export const deleteBeer = async (req: express.Request, res: express.Response) => {
    try {
        const beerId = req.params.id;
        if (!beerId) {
            return res.status(400).json({ message: "Beer ID is required" });
        }
        const deletedBeer = await Beer.findByIdAndDelete(beerId);
        if (!deletedBeer) {
            return res.status(404).json({ message: "Beer not found" });
        }
        res.status(200).json({ message: "Beer deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: `Error while deleting beer: ${error.message}` });
    }
};