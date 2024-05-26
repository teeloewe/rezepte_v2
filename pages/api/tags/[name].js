import { getTag, updateTag, deleteTag } from "@/lib/tags/tag"

export default async function handler(req, res) {
    const { name } = req.query

    if (req.method == "PUT") {
        const { newData } = JSON.parse(req.body)
        const data = await updateTag(name, newData)
        res.status(data.code).json(data)

    } else if (req.method == "DELETE") {
        const data = await deleteTag(name)
        res.status(data.code).json(data)

    } else {
        const data = await getTag(name)
        res.status(data.code).json(data)

    }
}
