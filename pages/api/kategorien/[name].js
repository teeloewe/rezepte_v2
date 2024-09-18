import { getKategorie, updateKategorie, deleteKategorie } from "@/lib/kategorien/kategorie"

export default async function handler(req, res) {
    const { name } = req.query
    if (req.method == "PUT") {
        const data = await updateKategorie(name, JSON.parse(req.body).name)
        res.status(data.code).json(data)

    } else if (req.method == "DELETE") {
        const data = await deleteKategorie(name)
        res.status(data.code).json(data)

    } else {
        const data = await getKategorie(name)
        res.status(data.code).json(data)

    }
}
