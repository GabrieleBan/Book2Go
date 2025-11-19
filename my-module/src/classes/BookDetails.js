export default class BookDetails {
    constructor({
                    id,
                    title,
                    author,
                    rating,
                    image,
                    description,
                    prices,
                    tags,

                    // Nuove proprietà complete dal JSON
                    isbn,
                    publisher,
                    publicationDate,
                    coverImageUrl,
                    categories,
                    availableFormats
                }) {
        // Proprie originali
        this.id = id;
        this.title = title;
        this.author = author;
        this.rating = rating;
        this.image = image;
        this.description = description;
        this.prices = prices;
        this.tags = tags;

        // Nuove proprietà
        this.isbn = isbn;
        this.publisher = publisher;
        this.publicationDate = publicationDate;
        this.coverImageUrl = coverImageUrl;
        this.categories = categories;
        this.availableFormats = availableFormats;
    }

    // Manteniamo la firma esistente
    getPrice(format = "Fisico") {
        return this.prices?.[format] || null;
    }

    getStars() {
        return "★".repeat(Math.floor(this.rating || 0));
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            author: this.author,
            rating: this.rating,
            image: this.image,
            description: this.description,
            prices: this.prices,
            tags: this.tags,

            // Tutti i nuovi campi
            isbn: this.isbn,
            publisher: this.publisher,
            publicationDate: this.publicationDate,
            coverImageUrl: this.coverImageUrl,
            categories: this.categories,
            availableFormats: this.availableFormats
        };
    }

    static fromJSON(json) {
        // Mappa in formato dei vecchi "prices"
        const prices = {};
        if (json.availableFormats) {
            const map = {
                PHYSICAL: "Fisico",
                EBOOK: "Digitale",
                AUDIOBOOK: "Audiolibro"
            };
            json.availableFormats.forEach(f => {
                const key = map[f.formatType];
                if (key) prices[key] = f.purchasePrice ?? null;
            });
        }

        // Mappa "categories" → "tags" (solo nomi)
        const tags = json.categories
            ? json.categories.map(c => c.name)
            : [];

        return new BookDetails({
            id: json.id,
            title: json.title,
            author: json.author,
            rating: json.rating ?? 0,
            image: json.coverImageUrl,
            description: json.description,
            prices,
            tags,

            // Nuovi campi completi
            isbn: json.isbn,
            publisher: json.publisher,
            publicationDate: json.publicationDate,
            coverImageUrl: json.coverImageUrl,
            categories: json.categories,
            availableFormats: json.availableFormats
        });
    }
}