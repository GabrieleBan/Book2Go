export const API = {
    READER: import.meta.env.VITE_API_URL_READER,
    RENTAL: import.meta.env.VITE_API_URL_RENTAL,
    AUTH: import.meta.env.VITE_API_URL_AUTH,
    BOOK: import.meta.env.VITE_API_URL_BOOK,
    REVIEW: import.meta.env.VITE_API_URL_REVIEW,
};
console.log("API:", API);
console.log(import.meta.env)