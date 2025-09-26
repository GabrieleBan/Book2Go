export default class Book{
    constructor({ id, title, author, rating, image, description, prices,tags }) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.rating = rating;
        this.image = image;
        this.description = description;
        this.prices = prices; // { Fisico, Digitale, Audiolibro }
        this.tags=tags;
    }

    // Example method: get price for a specific format
    getPrice(format = "Fisico") {
        return this.prices[format] || null;
    }

    // Example method: get rating stars string
    getStars() {
        return "★".repeat(Math.floor(this.rating));
    }

    toJSON() {
        return {
            id : this.id ,
            title : this.title ,
            author : this.author,
            rating : this.rating,
            image : this.image,
            description : this.description,
            prices : this.prices,
            tags : this.tags,
        }
    }
    static fromJSON(json) {
        return new Book(json);
    }

}