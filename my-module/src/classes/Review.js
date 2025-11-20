
export default class Review {
    constructor({
                    id,
                    reviewerId,
                    bookId,
                    overallScore,
                    title,
                    text,
                    postedDate,
                }) {
        this.id = id;
        this.reviewerId = reviewerId;
        this.bookId = bookId;

        // Rating
        this.rating = overallScore;

        // Contenuti recensione
        this.title = title;
        this.text = text;

        // Data convertita in oggetto Date
        this.date = postedDate ? new Date(postedDate) : null;

        // Placeholder — saranno aggiornati quando avrai il servizio utenti
        this.user = "Caricamento...";
        this.avatar = "/placeholder-avatar.png";

        /**
         *  FUTURE FETCH: recupero info utente
         *
         * Esempio quando avrai il servizio utenti:
         *
         * fetch(`http://localhost:8080/users/${reviewerId}`)
         *     .then(res => res.json())
         *     .then(user => {
         *          this.user = user.username;
         *          this.avatar = user.avatarUrl ?? "/placeholder-avatar.png";
         *     })
         *     .catch(() => {
         *          this.user = "Utente sconosciuto";
         *     });
         */
    }
    static async postReview(authToken, reviewToPost) {
        // reviewToPost deve essere un oggetto con { bookId, overallScore, title, text }
        const url = "http://localhost:8097/reviews/";

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}` // token Bearer
            },
            body: JSON.stringify(reviewToPost)
        });

        if (!res.ok) {
            let additional_info = "";
            if (res.status === 403) {
                additional_info = ": Devi essere loggato";
            }
            throw new Error(`Errore nella creazione della recensione${additional_info}`);
        }

        // ritorna la risposta completa del server
        return await res.json();
    }
    static async fetchReviewByBookIdPaginated(bookId, page = 0, size = 10) {
        const url = new URL(`http://localhost:8097/reviews/${bookId}`);
        url.searchParams.append("page", page);
        url.searchParams.append("size", size);
        url.searchParams.append("sort", "postedDate,desc");

        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "NeedsDescriptions": "true" // se YAak lo richiede, altrimenti rimuovi
            }
        });

        if (!res.ok) {
            throw new Error("Failed to fetch reviews");
        }

        const data = await res.json();

        return {
            reviews: data.content.map(r => new Review(r)),
            page: data.number,
            size: data.size,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            isLast: data.last
        };
    }
}