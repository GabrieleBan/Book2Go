export default class BookSummary {
    constructor({
                    id,
                    title,
                    author,
                    rating = null,
                    prices = {},
                    image = null,            // viene dal mock
                    coverImageUrl = null,    // arriva dall’API futura
                    description = "",
                    tags = [],               // categorie testuali
                    categories = []          // categorie API future
                }) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.rating = rating;
        this.prices = prices;
        this.image = image;
        this.coverImageUrl = coverImageUrl;
        this.description = description;
        this.tags = tags;
        this.categories = categories;
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
        return new BookSummary({
            id: json.id,
            title: json.title,
            author: json.author,
            rating: json.rating ?? null,
            prices: json.prices ?? {},
            image: json.image ?? null,
            coverImageUrl: json.coverImageUrl ?? null,
            description: json.description ?? "",
            tags: json.tags ?? (json.categories ? json.categories.map(c => c.name) : []),
            categories: json.categories ?? []
        });
    }
}