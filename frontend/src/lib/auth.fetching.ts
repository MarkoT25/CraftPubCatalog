export async function registerUser(username: string, email: string, password: string) {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/sign-up`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
    });

    if (!response.ok) {
        console.error('Failed to sign up')
    }

    const data = await response.json();
    return data;
}

export async function loginUser(email: string, password: string) {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        console.error('Failed to log in')
    }

    const data = await response.json();
    return data;
}

export async function logoutUser() {
    const token = localStorage.getItem("jwt");
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.error('Failed to log out')
    }
    const data = await response.json();
    return data;
}

export async function getUser() {
    const token = localStorage.getItem("jwt");
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/check`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.error('Failed to fetch user profile')
    }

    const data = await response.json();
    return data;
}