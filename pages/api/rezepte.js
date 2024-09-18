import { getAllRezepte } from "@/lib/rezepte/rezeptGet";
import { createRezept } from "@/lib/rezepte/rezepteCreate";
import { deleteRezept } from "@/lib/rezepte/rezepteDelete";
import { filterRezepte } from "@/lib/rezepte/rezeptGet";

const testData = {
    name: "Gurkensalat",
    duration: 60,
    image: null,
    file: null,
    description: "Sehr Leckeres Gericht",
    difficulty: 1,
    rating: 5,
    tags: ["Europäisch", "Beilage"],
    zutaten: [
        {
            name: "Zwiebel",
            quantity: 2,
            einheit: "(Stück)"
        },
        {
            name: "Zitrone",
            quantity: 1,
            einheit: "(Stück)"
        },
        {
            name: "Gurke",
            quantity: 2,
            einheit: "(Stück)"
        },
        {
            name: "Tomate",
            quantity: 500,
            einheit: "Gramm"
        }
    ]
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        let data = await createRezept(JSON.parse(req.body))
        res.status(data.code).json(data)
    } else {
        let data = await deleteRezept("Cinque Pii")
        res.status(data.code).json(data)
        
    }
}
