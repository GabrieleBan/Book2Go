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


        this.description = description ?? "";
        this.tags = tags ?? [];
        this.categories = categories ?? [];
    }

    getStars() {
        return this.rating ? "★".repeat(Math.floor(this.rating)) : "";
    }


    getPrice(format = "PHYSICAL") {
        if (!this.prices || Object.keys(this.prices).length === 0) return null;

        if (format === "Fisico") {

            const allPrices = Object.values(this.prices)
                .map(p => p?.discountedPrice ?? p?.basePrice ?? null)
                .filter(p => p != null);
            return allPrices.length > 0 ? Math.max(...allPrices) : null;
        }


        const priceObj = this.prices[format];
        if (!priceObj) {

            const firstPrice = Object.values(this.prices)
                .map(p => p?.discountedPrice ?? p?.basePrice ?? null)
                .find(p => p != null);
            return firstPrice ?? null;
        }

        return priceObj.discountedPrice ?? priceObj.basePrice ?? null;
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
            description: json.description ?? "",
            tags,
            categories
        });
    }

    static async fetchAll(filters = {}) {
        try {
            const apiEndpoint = `${API.BOOK}/books/`;
            const params = new URLSearchParams();
            console.log("params",filters)
            const {
                title,
                author,
                publisher,
                categoryIds = [],
                formatType,
                minPrice,
                maxPrice,
                minRating,
                page = 0,
                size = 20,
                sort = "title,asc"
            } = filters;

            if (title?.trim()) params.append("title", title.trim());
            if (author?.trim()) params.append("author", author.trim());
            if (publisher?.trim()) params.append("publisher", publisher.trim());

            if (categoryIds.length > 0) {
                params.append("categoryIds", categoryIds.join(","));
            }

            if (formatType) params.append("formatType", formatType);
            if (minPrice != null) params.append("minPrice", minPrice);
            if (maxPrice != null) params.append("maxPrice", maxPrice);
            if (minRating != null) params.append("minRating", minRating);

            params.append("page", page);
            params.append("size", size);
            params.append("sort", sort);

            const url = `${apiEndpoint}?${params.toString()}`;
            const res = await fetch(url, { method: "GET" });

            if (!res.ok) throw new Error("Errore nel fetch dei libri");

            const data = await res.json();
            console.log("📚 retrieved response:", data);

            return data.content.map(b => BookSummary.fromJSON(b));
        } catch (err) {
            console.error(err);
            return [];
        }

    }

    get coverImageUrl() {
        return this.id
            ? `${API.CONTENT}/content/${this.id}/cover-image`
            : "/placeholder-book.jpg";
    }
}