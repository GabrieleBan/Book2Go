export default class BookSummary {
    constructor({
                    id,
                    title,
                    author,
                    rating = null,
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

    getPrice(format = "Fisico") {
        return this.prices?.[format] ?? null;
    }


    toJSON() {
        return {
            id: this.id,
            title: this.title,
            author: this.author,
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
            author: json.author ?? "Unknown",
            rating: json.rating ?? 0,
            prices: json.prices ?? { Fisico: 0, Digitale: 0, Audiolibro: 0 },
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
            const apiEndpoint = "http://localhost:8091/books/";
            const params = new URLSearchParams();

            // Aggiungi categoryIds se presenti
            if (categoryIds.length > 0) {
                params.append("categoryIds", categoryIds.join(","));
            }

            // Aggiungi name se non è vuoto
            if (name.trim()) {
                params.append("name", name.trim());
            }

            const url = `${apiEndpoint}?${params.toString()}`;
            const res = await fetch(url, { method: "GET" });

            if (!res.ok) throw new Error("Errore nel fetch dei libri");

            const data = await res.json();
            console.log(data)
            return data.map((b) => BookSummary.fromJSON(b));
        } catch (err) {
            console.error(err);
            return [];
        }
    }
}