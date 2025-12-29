import { API } from "@/utils/api.js";
export default class User {
    constructor({
                    id,
                    username,
                    email,
                    imageUrl,
                    name,
                    surname,
                    phone,
                    subscription,
                    address,
                    description,
                    readerPoints
                }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.imageUrl = imageUrl ?? "/default-user.png";

        this.name = name;
        this.surname = surname;
        this.phone = phone;

        this.subscription = subscription;
        this.address = address;
        this.description = description;
        this.readerPoints = readerPoints;
    }

    static fromJSON(json) {
        return new User({
            id: json.id,
            username: json.username,
            email: json.email,
            imageUrl: json.imageUrl,

            name: json.name,
            surname: json.surname,
            phone: json.phone,

            subscription: json.subscription,
            address: json.address,
            description: json.description,
            readerPoints: json.readerPoints
        });
    }

    /**
     * Fetch user data (/readers/me/info)
     * @param {string} token - JWT token
     * @returns {Promise<User|null>}
     */
    static async fetchMe(token) {
        try {
            const res = await fetch(`${API.READER}/readers/me/info`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error("Errore durante il recupero dell'utente");
            }

            const data = await res.json();
            return User.fromJSON(data);

        } catch (err) {
            console.error("User.fetchMe error:", err);
            return null;
        }
    }
}