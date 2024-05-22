import prisma from "../client";
import { errorHandle, successHandle } from "../helpers";

export async function deleteRezept(name) {
    if(!name) return errorHandle(400, "Bitte gib Name ein!")

    let data = null

    await prisma.$transaction([
        prisma.rezept_Zutaten.deleteMany({
            where: {
                rezept: {
                    name
                }
            }
        }),
        prisma.rezept.delete({
            where: {
                name
            }
        })
    ])
    .then(d => data = successHandle(data))
    .catch(d => data = errorHandle(400, "Löschen fehlgeschlagen"))

    return data
}

export async function test() {
    console.log((await deleteRezept("Zitronen Thymiansauce")))
}