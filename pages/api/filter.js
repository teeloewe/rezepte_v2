import { filterRezepte } from "@/lib/rezepte/rezeptGet";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        let filter = JSON.parse(req.body)
        let data = await filterRezepte(filter)
        res.status(data.code).json(data)
    }
}
