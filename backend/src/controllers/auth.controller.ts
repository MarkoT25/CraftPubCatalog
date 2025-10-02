import express from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token";
import { AuthRequest } from "../middleware/auth.middleware";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";


export const signUp = async (req: express.Request, res: express.Response) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const user = await User.findOne({
            email
        });

        if (user) {
            return res.status(400).json({ message: "User with this email address already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        if (newUser) {
            //   generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({ message: "User created successfully", user: newUser });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error: any) {
        res.status(500).json({ message: `Error while creating user: ${error.message}` });
    }

}

export const login = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        const user = await User.findOne({
            email
        });

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = generateToken(user._id, res);
                if (token) {
                    res.status(200).json({ message: 'success', token: token, user });
                } else {
                    res.status(400).json({ message: "Error with token at login route" });
                }
            } else {
                res.status(400).json({ message: "Invalid credentials" });
            }
        }


    } catch (error: any) {
        console.log("Error in login controller", error);
        res.status(500).json({ message: `Error while login user: ${error.message}` });
    }

}

export const logout = async (req: express.Request, res: express.Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(400).json({ message: "Token is required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        res.status(200).json({ message: "User logged out successfully" });
    } catch (error: any) {
        console.log("Error in logout controller", error);
        res.status(400).json({ message: `Error while logging out user: ${error.message}` });
    }
}


// export const updateProfile = async (req: AuthRequest, res: express.Response) => {
//     const profilePic = req.body.profilePic;
//     const userId = req.user._id;
//     const description = req.body.description;
//     const gender = req.body;

//     try {
//         // if (!profilePic) {
//         //     return res.status(400).json({ message: "Please provide a profile picture" });
//         // }


//         if (profilePic) {
//             const uploadRes = await cloudinary.uploader.upload(profilePic);

//         }
//         const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadRes.secure_url }, { new: true });

//         res.status(200).json({ message: "Profile updated successfully", user: updatedUser });

//     } catch (error: any) {
//         console.log("Error in updateProfile controller", error);
//         res.status(500).json({ message: `Error while updating profile: ${error.message}` });
//     }

// }

// export const updateProfile = async (req: AuthRequest, res: express.Response) => {
//     const username = req.body.username;
//     const profilePic = req.body.profilePic;
//     const userId = req.user._id;
//     const description = req.body.description;
//     const gender = req.body.gender;
//     const age = req.body.age;

//     try {
//         let updateData: any = {};

//         if (username) {
//             updateData.username = username;
//         }

//         if (profilePic) {
//             const uploadRes = await cloudinary.uploader.upload(profilePic);
//             updateData.profilePic = uploadRes.secure_url;
//         }

//         if (description) {
//             updateData.description = description;
//         }

//         if (gender) {
//             updateData.gender = gender;
//         }

//         if (age) {
//             updateData.age = age;
//         }

//         console.log("updateData", updateData);
//         const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

//         res.status(200).json({ message: "Profile updated successfully", user: updatedUser });

//     } catch (error: any) {
//         console.log("Error in updateProfile controller", error);
//         res.status(500).json({ message: `Error while updating profile: ${error.message}` });
//     }
// }

export const retrieveProfile = async (req: AuthRequest, res: express.Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error: any) {
        console.log("Error in retrieveProfile controller", error);
        res.status(500).json({ message: `Error while retrieving profile: ${error.message}` });
    }
};