import { API } from "@/utils/api.js";
export default class BookSummary {
    constructor({
                    id,
                    title,
                    author,
                    publisher = "Unknown",
                    rating = 0,
                    prices = {},
                    image = null,
                    coverImageUrl = null,
                    description = "",
                    tags = [],
                    categories = []
                }) {
        this.id = id ?? "0";
        this.title = title ?? "Untitled";
        this.author = author ?? "Unknown";
        this.publisher = publisher ?? "Unknown";
        this.rating = rating ?? 0;
        this.prices = prices ?? {};

        this.image = image ?? "/placeholder-book.jpg";
        this.coverImageUrl = coverImageUrl ?? "/placeholder-book.jpg";

        this.description = description ?? "";
        this.tags = tags ?? [];
        this.categories = categories ?? [];
    }

    getStars() {
        return this.rating ? "★".repeat(Math.floor(this.rating)) : "";
    }

    /**
     * Restituisce il prezzo per formato
     * @param {string} format - "PHYSICAL", "EBOOK", "AUDIOBOOK"
     * @returns {number|null}
     */
    getPrice(format = "PHYSICAL") {
        if (format === "Fisico") {
            // Ritorna il prezzo più alto tra tutti i formati
            const values = Object.values(this.prices);
            return values.length > 0 ? Math.max(...values) : null;
        }
        return this.prices?.[format] ?? null;
    }


    toJSON() {
        return {
            id: this.id,
            title: this.title,
            author: this.author,
            publisher: this.publisher,
            rating: this.rating,
            prices: this.prices,
            image: this.image,
            coverImageUrl: this.coverImageUrl,
            description: this.description,
            tags: this.tags,
            categories: this.categories
        };
    }

    static fromJSON(json) {
        const categories = json.categories ?? [];
        const tags = categories.map(c => c.name);

        return new BookSummary({
            id: json.id ?? "0",
            title: json.title ?? "Untitled",
            author: json.authors ?? json.author ?? "Unknown",
            publisher: json.publisher ?? "Unknown",
            rating: json.rating ?? 0,
            prices: json.prices ?? { PHYSICAL: 0, EBOOK: 0, AUDIOBOOK: 0 },
            image: json.image ?? json.coverImageUrl ?? "/placeholder-book.jpg",
            coverImageUrl: json.coverImageUrl ?? "/placeholder-book.jpg",
            description: json.description ?? "",
            tags,
            categories
        });
    }

    /**
     * Fetch books optionally filtered by name and category IDs
     * @param {string} [name] - Optional substring to filter book titles
     * @param {string[]} [categoryIds] - Optional array of category UUIDs
     * @returns {Promise<BookSummary[]>}
     */
    static async fetchAll(name = "", categoryIds = []) {
        try {
            const apiEndpoint = `${API.BOOK}/books/`;
            console.log(apiEndpoint)
            const params = new URLSearchParams();

            if (categoryIds.length > 0) {
                params.append("categoryIds", categoryIds.join(","));
            }

            if (name.trim()) {
                params.append("name", name.trim());
            }

            const url = `${apiEndpoint}?${params.toString()}`;
            const res = await fetch(url, { method: "GET" });

            if (!res.ok) throw new Error("Errore nel fetch dei libri");

            const data = await res.json();
            return data.map(b => BookSummary.fromJSON(b));
        } catch (err) {
            console.error(err);
            return [];
        }
    }
}