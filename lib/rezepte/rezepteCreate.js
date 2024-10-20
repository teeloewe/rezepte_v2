import prisma from "../client";
import { errorHandle, successHandle } from "../helpers";

export async function createRezept({ name, duration, image, file, description, difficulty, rating, tags, zutaten }) {

    if (!name || typeof name !== "string" || name.length > 40) return errorHandle(400, "Name ungültig!")

    if (!duration || typeof duration !== "number") return errorHandle(400, "Dauer ungültig!")

    if (!difficulty || typeof difficulty !== "number" || difficulty > 5 || difficulty < 1) return errorHandle(400, "Schwierigkeit ungültig!")

    if (!rating || typeof rating !== "number" || rating > 5 || rating < 1) return errorHandle(400, "Bewertung ungültig!")

    let data = null

    await prisma.rezept.create({
        data: {
            name: name,
            duration: duration,
            image: image,
            file: file,
            description: description,
            difficulty: difficulty,
            rating: rating,
            tags: {
                connect: 
                    tags.map(t => {
                        return {
                            name: t
                        }
                    })
            },
            zutaten: {
                create:
                    zutaten.map(z => {
                        return {
                            quantity: z.quantity,
                            einheit: {
                                connect: {
                                    name: z.einheit
                                }
                            },
                            zutat: {
                                connect: {
                                    name: z.name
                                }
                            }
                        }
                    })
            }
        }
    })
    .then(d => data = successHandle(d))
    .catch(e => data = errorHandle(400, "Etwas ist ungültig!"))

    return data
}

export async function test() {

}

