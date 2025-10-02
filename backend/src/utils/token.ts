import jwt from "jsonwebtoken";
import { Response } from "express";
import { ObjectId } from "mongodb";

export const generateToken = (userId: ObjectId, res: Response) => {

    const token = jwt.sign({ userId }, process.env.JWT_SECRET || "", {
        expiresIn: "7d"
    });


    // res.cookie("jwt", token, {
    //     maxAge: 7 * 24 * 60 * 60 * 1000,
    //     httpOnly: true,
    //     sameSite: "strict",
    //     secure: process.env.NODE_ENV === "production",
    // })

    return token;
}


export const verifyToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
        return decoded;
    } catch (error) {
        console.log("Error in verifyToken", error);
        return null;
    }
}