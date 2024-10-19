import prisma from "../client";
import { errorHandle, successHandle } from "../helpers";

export async function updateRezept(oldName, { name , duration, image, file, description, difficulty, rating, tags, zutaten }) {

    if (!oldName) return errorHandle(400, "Du musst einen Namen eingeben!")

    if (!name || typeof name !== "string" || name.length > 25) return errorHandle(400, "Name ungültig!")

    if (!duration || typeof duration !== "number") return errorHandle(400, "Dauer ungültig!") //Länge 25

    if (!difficulty || typeof difficulty !== "number" || difficulty > 5 || difficulty < 1) return errorHandle(400, "Schwierigkeit ungültig!")

    if (!rating || typeof rating !== "number" || rating > 5 || rating < 1) return errorHandle(400, "Bewertung ungültig!")


    let data = null

    await prisma.rezept.update({
        where: {
            name: oldName,
        },
        data: {
            name: name,
            duration: duration,
            image: image,
            file: file,
            description: description,
            difficulty: difficulty,
            rating: rating,
            tags: {
                set: [],
                connect: tags.map(t => {
                    return {
                        name: t
                    }
                })
            },
            zutaten: {
                deleteMany: {},
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
    .catch(e => data = e)

    return data
}

export async function test() {
    console.log((await updateRezept("Zitronen Thymiansauce", testData)))
    console.log("DONE")
}

