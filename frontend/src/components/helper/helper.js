/**
 * Checks if the user is authenticated by verifying the presence of a token in localStorage.
 * @returns {boolean} - True if authenticated, false otherwise.
 */
export const isAuthenticated = () => {
    if (typeof window === 'undefined') {
        console.log("Window is undefined. User is not authenticated.");
        return false;
    }
    
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token; // This converts the token to a boolean.
    
    console.log("Authentication status:", isAuthenticated);
    return isAuthenticated;
};

/**
 * Retrieves the user ID from localStorage, which could be either email or phone number.
 * Handles cases where user data is stored as plain text or JSON.
 * @returns {string|boolean} - User ID if available, false otherwise.
 */
export const getUserID = () => {
    if (typeof window === 'undefined') {
        console.log("Window is undefined. Cannot retrieve user ID.");
        return false;
    }

    const user = localStorage.getItem('user');
    console.log("Retrieved user from localStorage:", user);

    if (user) {
        try {
            if (user.startsWith('{') && user.endsWith('}')) {
                const parsedUser = JSON.parse(user);
                console.log("Parsed user JSON:", parsedUser);

                const userId = parsedUser.email || parsedUser.phone;
                if (userId) {
                    console.log("User ID extracted:", userId);
                    return userId;
                }
            } else {
                console.log("User is a plain string:", user);
                return user;
            }
        } catch (e) {
            console.error("Unexpected error when parsing user data:", e);
            return false;
        }
    }

    console.log("No user data found in localStorage.");
    return false;
};


export const HandleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log("User logged out. Local storage cleared.");
    
    window.location.href = '/'; 
};
