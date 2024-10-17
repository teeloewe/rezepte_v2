import prisma from "../client";
import { errorHandle, successHandle, includeRezeptObj } from "../helpers";
import { defaultSortierung, possibleOrders } from "../constants";

export async function getAllRezepte() {

    let data = await prisma.rezept.findMany({
        include: includeRezeptObj,
    })

    return successHandle(data)
}

export async function getRezeptById(id) {
    let data = await prisma.rezept.findUnique({
        where: {
            id
        },
        include: includeRezeptObj
    })

    return data ? successHandle(data) : errorHandle(400, "Dieses Rezept existiert nicht!")
}

async function getRezepte(name) {
    if(!name) return errorHandle(400, "Bitte gib etwas ein!")

    let data = await prisma.rezept.findMany({
        include: includeRezeptObj,
        where: {
            OR: [
                {
                    name: {
                        contains: name,
                        mode: "insensitive"

                    }
                }
            ]
        }
    })

    return successHandle(data)
}

export async function filterRezepte({ duration, difficulty, rating, tags, zutaten, order }) {
    if (typeof duration !== "number") return errorHandle(400, "Dauer ungültig!")
    if (typeof difficulty !== "number") return errorHandle(400, "Schwierigkeit ungültig!")
    if (typeof rating !== "number") return errorHandle(400, "Bewertung ungültig!")
    if (Array.isArray(tags) && tags.length === 0) tags = null
    if (Array.isArray(zutaten) && zutaten.length === 0) zutaten = null
    if (!order) order = defaultSortierung //Default Sortierung
    if (!possibleOrders.includes(order[0])) return errorHandle(400, "Nach diesem Kriterium kannst du nicht sortieren!")

    let data = null
    await prisma.rezept.findMany({
        include: includeRezeptObj,
        where: {
            AND: [
                {
                    duration: {
                        lte: duration
                    }
                },
                {
                    difficulty: {
                        lte: difficulty
                    }
                },
                {
                    rating: {
                        gte: rating,
                    }
                },
                {
                    zutaten: (!zutaten ? undefined : {
                        some: {
                            zutat: {
                                OR: zutaten.map((z) => {
                                    return {
                                        name: z.name
                                    }
                                })
                            }
                        }
                    })
                },
                {
                    tags: (!tags ? undefined : {
                        some: {
                            OR: tags.map((t) => {
                                return {
                                    name: t.name
                                }
                            })
                        }
                    })
                }
            ]
        },
        orderBy: {
            [order[0]]: order[1]
        }
        
    })
    .then(d => data = successHandle(d))
    .catch(d => data = errorHandle(400, "Etwas ist ungültig!"))

    return data
}

export async function test() {
    console.log((await filterRezepte(testFilter)))
}

