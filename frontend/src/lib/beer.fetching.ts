import { getToken } from "./token";

const buildParams = (obj: Record<string, any>): URLSearchParams => {
    const params = new URLSearchParams();

    Object.entries(obj).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            params.append(key, value.toString());
        }
    });

    return params;
};


interface FetchBeersParams {
    search?: string;
    manufacturer?: string;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;  // default: sort by manufacturer
    order?: 'asc' | 'desc'; // alphabetical order
    page?: number;
    limit?: number;
}


export async function fetchBeers({
    search,
    manufacturer,
    type,
    minPrice,
    maxPrice,
    sort = 'manufacturer',
    order = 'asc',
    page = 1,
    limit = 10
}: FetchBeersParams) {
    const token = getToken();

    const params = buildParams({
        search,
        manufacturer,
        type,
        minPrice,
        maxPrice,
        sort,
        order,
        page,
        limit
    });

    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/beers?${params.toString()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch beers');
    }

    const data = await response.json();
    console.log("Fetched beers:", data);
    return data;
}