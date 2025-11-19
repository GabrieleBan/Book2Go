import BookSummary from "@/classes/BookSummary.js";

export default class LibraryBook extends BookSummary {
    constructor({ format, owned, lent, expireDate, tags, ...bookProps }) {
        super(bookProps); // pass id, title, author, rating, image, description, prices
        this.format = format || "Fisico";
        this.owned = owned ?? true;
        this.lent = lent ?? false;
        this.expireDate = expireDate || null;
        this.tags = tags || [];
    }
}