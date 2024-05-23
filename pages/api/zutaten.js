import { getZutaten, createZutat } from "@/lib/zutaten/zutat";

export default async function handler(req, res) {
    if (req.method == "POST") {
        const data = await createZutat(req.body.name)
        res.status(data.code).json(data)
    } else {
        const data = await getZutaten()
        res.status(data.code).json(data)
    }
}
