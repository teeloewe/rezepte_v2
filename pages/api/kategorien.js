import { getKategorien, createKategorie } from "@/lib/kategorien/kategorie"

export default async function handler(req, res) {
    if (req.method == "POST") {
        const data = await createKategorie(JSON.parse(req.body).name)
        res.status(data.code).json(data)
    } else {
        const data = await getKategorien()
        res.status(data.code).json(data)
    }
}
