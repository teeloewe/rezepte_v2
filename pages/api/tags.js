import { getTags, createTag } from "@/lib/tags/tag"

export default async function handler(req, res) {
    if (req.method == "POST") {
        const { name, category } = JSON.parse(req.body)
        const data = await createTag(name, category)
        res.status(data.code).json(data)
    } else {
        const data = await getTags()
        res.status(data.code).json(data)
    }
}
