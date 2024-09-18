import { getZutat, deleteZutat, updateZutat } from "@/lib/zutaten/zutat"

export default async function handler(req, res) {
    const { name } = req.query
    if (req.method == "PUT") {
        const data = await updateZutat(name, JSON.parse(req.body).name)
        res.status(data.code).json(data)

    } else if (req.method == "DELETE") {
        const data = await deleteZutat(name)
        res.status(data.code).json(data)

    } else {
        const data = await getZutat(name)
        res.status(data.code).json(data)

    }
}
