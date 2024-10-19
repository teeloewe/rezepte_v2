import { deleteRezept } from "@/lib/rezepte/rezepteDelete"
import { updateRezept } from "@/lib/rezepte/rezepteUpdate"

export default async function handler(req, res) {
    const { name } = req.query
    if (req.method == "PUT") {
        const data = await updateRezept(name, JSON.parse(req.body))
        console.log(data.error)
        res.status(data.code).json(data)
    } else if (req.method == "DELETE") {
        const data = await deleteRezept(name)
        res.status(data.code).json(data)
    }
}
