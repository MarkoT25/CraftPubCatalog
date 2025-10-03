export interface User {
    _id: string;
    username: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    favorites: string[];
    cart: string[];
}

export interface Beer {
    _id: string;
    name: string;
    description: string;
    manufacturer: string;
    type: string;
    price: number;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}