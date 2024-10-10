import Cookies from 'js-cookie';
 
const cookieStorage = {
    getItem: (key: string): Promise<any> => {
        return new Promise((resolve) => {
            const value = Cookies.get(key);
            resolve(value !== undefined ? JSON.parse(value) : null);
        });
    },
    setItem: (key: string, value: any): Promise<void> => {
        return new Promise((resolve) => {
            Cookies.set(key, JSON.stringify(value), {
                secure: true, // Ensure the cookie is only sent over HTTPS
                sameSite: 'Strict', // Mitigate CSRF attacks
            });
            resolve(); // Resolve without a value since setItem doesn't return anything
        });
    },
    removeItem: (key: string): Promise<void> => {
        return new Promise((resolve) => {
            Cookies.remove(key, {
                secure: true, // Ensure the cookie is only sent over HTTPS
                sameSite: 'Strict', // Mitigate CSRF attacks
            });
            resolve(); // Resolve without a value since removeItem doesn't return anything
        });
    },
};


export default cookieStorage
