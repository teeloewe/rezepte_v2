import { deleteRezept } from "@/lib/rezepte/rezepteDelete"

export default async function handler(req, res) {
    const { name } = req.query
    if (req.method == "PUT") {
        // TODO
    } else if (req.method == "DELETE") {
        const data = await deleteRezept(name)
        res.status(data.code).json(data)
    }
}
