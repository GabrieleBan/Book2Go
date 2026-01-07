export const API = {
    READER: import.meta.env.VITE_API_URL_READER,
    RENTAL: import.meta.env.VITE_API_URL_RENTAL,
    LEND: import.meta.env.VITE_API_URL_RENTAL,
    AUTH: import.meta.env.VITE_API_URL_AUTH,
    BOOK: import.meta.env.VITE_API_URL_BOOK,
    REVIEW: import.meta.env.VITE_API_URL_REVIEW,
    CONTENT: import.meta.env.VITE_API_URL_CONTENT,
    INVENTORY:import.meta.env.VITE_API_URL_INVENTORY,

};
console.log("API:", API);
console.log(import.meta.env)