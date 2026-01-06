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
                    isbn,
                    publisher,
                    publicationDate,
                    coverImageUrl,
                    categories,
                    availableFormats
                }) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.rating = rating;
        this.image = image;
        this.description = description;
        this.prices = prices;
        this.tags = tags;
        this.isbn = isbn;
        this.publisher = publisher;
        this.publicationDate = publicationDate;
        this.coverImageUrl = coverImageUrl;
        this.categories = categories;
        this.availableFormats = availableFormats;
    }

    getPrice(format = "Fisico") {
        if (!this.prices || Object.keys(this.prices).length === 0) {
            return null;
        }

        if (this.prices[format] != null) {
            return this.prices[format];
        }

        // Ritorna il primo prezzo disponibile
        const firstPrice = Object.values(this.prices).find(p => p != null);
        return firstPrice ?? null;
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
            isbn: this.isbn,
            publisher: this.publisher,
            publicationDate: this.publicationDate,
            coverImageUrl: this.coverImageUrl,
            categories: this.categories,
            availableFormats: this.availableFormats
        };
    }

    static fromJSON(json) {
        const prices = {};

        if (json.prices) {
            for (const [key, val] of Object.entries(json.prices)) {
                prices[key] = val?.discountedPrice ?? val?.basePrice ?? null;
            }
        }
        if (json.availableFormats) {
            const map = {
                PHYSICAL: "Fisico",
                EBOOK: "Digitale",
                AUDIOBOOK: "Audiolibro",
                PAPERBACK: "COPERTINA FLESSIBILE",
                HARDBACK: "COPERTINA RIGIDA"
            };
            json.availableFormats.forEach(f => {
                const key = map[f.formatType];
                if (key) prices[key] = f.discountedPrice ?? f.purchasePrice ?? f.basePrice ?? null;
            });
        }

        const tags = json.categories?.map(c => c.name) || [];

        return new BookDetails({
            id: json.id ?? "0",
            title: json.title ?? "Untitled",
            author: json.author ?? "Unknown",
            rating: json.rating ?? 0,
            image: json.coverImageUrl ?? "/placeholder-book.jpg",
            description: json.description ?? "",
            prices,
            tags,
            isbn: json.isbn ?? "",
            publisher: json.publisher ?? "",
            publicationDate: json.publicationDate ?? "",
            coverImageUrl: json.coverImageUrl ?? "/placeholder-book.jpg",
            categories: json.categories ?? [],
            availableFormats: json.availableFormats ?? []
        });
    }


    // --- NUOVA FUNZIONE STATICA ---
    static async fetchById(id) {
        if (!id) throw new Error("Book ID is required");
        const res = await fetch(`http://localhost:8091/books/${id}`);
        if (!res.ok) throw new Error(`Failed to fetch book with id ${id}`);
        const data = await res.json();
        return BookDetails.fromJSON(data);
    }
}