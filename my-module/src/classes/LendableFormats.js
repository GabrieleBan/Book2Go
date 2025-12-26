import { API } from "@/utils/api.js";
export default class RentalFormat {
    constructor({
                    formatId,
                    formatType,
                    stockQuantity = null,
                    availableOnSubscription = true,
                    options = []
                }) {
        this.formatId = formatId;
        this.formatType = formatType;
        this.stockQuantity = stockQuantity;
        this.availableOnSubscription = availableOnSubscription;
        this.options = options;

    }

    static fromJSON(json) {
        return new RentalFormat({
            formatId: json.formatId,
            formatType: json.type,
            stockQuantity: null,
            availableOnSubscription: true,
            options: json.options ?? []
        });
    }


    static async fetchByBookId(bookId, token) {
        try {
            const url = `${API.RENTAL}/lendable-formats?bookId=${bookId}`;


            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw new Error("Errore nel fetch dei formati lendable");
            }

            const data = await res.json();
            return data.map(item => RentalFormat.fromJSON(item));

        } catch (err) {
            console.error(err);
            return [];
        }
    }
    static async fetchOptionsByFormatId(formatId, token) {
        try {
            const url = `${API.RENTAL}/lendable-formats/${formatId}/options`;

            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Errore nel fetch delle opzioni del formato");
            }

            return await res.json(); // ritorna direttamente l'array di options

        } catch (err) {
            console.error(err);
            return [];
        }
    }
}