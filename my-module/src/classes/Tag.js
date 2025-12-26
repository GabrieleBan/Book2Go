import {API} from "@/utils/api.js";

export default class Tag {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    static fromApiData(data) {
        return data.map(item => new Tag(item.id, item.name, item.description));
    }

    // Funzione statica per fetch dei tag
    static async fetchAll() {
        const apiEndpoint = `${API.BOOK}/categories/`
        const res = await fetch(apiEndpoint, {
            method: "GET", // esplicito
            headers: {
                "NeedsDescriptions": true
            }
        });
        if (!res.ok) throw new Error("Errore nel fetch dei tag");
        const data = await res.json();
        return Tag.fromApiData(data);
    }
}