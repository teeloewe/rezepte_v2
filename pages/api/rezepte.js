
import { createRezept } from "@/lib/rezepte/rezepteCreate";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        let data = await createRezept(JSON.parse(req.body))
        res.status(data.code).json(data)
    }
}
