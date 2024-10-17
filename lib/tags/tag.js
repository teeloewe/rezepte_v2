import prisma from "../client";
import { errorHandle, successHandle } from "../helpers";

// Alle Tags bekommen
export async function getTags() {
    let data =  await prisma.tag.findMany({
        include: {
            kategorie: true
        }
    });

    return successHandle(data)
}

// Tag nach name filtern
export async function getTag(name) {
    if (!name) return errorHandle(400, "Bitte gib etwas ein!")

    let data = await prisma.tag.findUnique({
    where: {
        name,
    },
    include: {
        kategorie: true,
    }
    });

    return (data ? successHandle(data) : errorHandle(400, "Tag ist nicht in der Datenbank!"))
}

// Tag nach name löschen
export async function deleteTag(name) {
    if (!name) return errorHandle(400, "Bitte gib etwas ein!")

    let data = null
    await prisma.tag.delete({
        where: {
            name,
        },
    })
    .then((d) => data = successHandle(d))
    .catch((e) => data = errorHandle(400, "Löschen Fehlgeschlagen!"))

    return data
}

//Tag erstellen
export async function createTag(name, kategorieName) {
    if (!name || !kategorieName) return errorHandle(400, "Bitte gib alles ein!")

    let data = null
    data =  await prisma.tag.create({
        data: {
            name,
            kategorie: {
                connectOrCreate: {
                    create: {
                        name: kategorieName
                    },
                    where: {
                        name: kategorieName
                    }
                }
            }
        }
    })
    .then(d => data = successHandle(d))
    .catch(e => data = errorHandle(400, "Etwas ist ungültig!"))

    return data
}

//Tag bearbeiten
export async function updateTag(nameAlt, datenNeu)  {
    if (!nameAlt) return errorHandle(400, "Bitte gib etwas ein!")
    if (!datenNeu.name && !datenNeu.kategorie) return errorHandle(400, "Bitte gib neue Daten korrekt ein!")

    let data = null
    data = await prisma.tag.update({
        where: {
            name: nameAlt,
        },
        data: {
            name: datenNeu.name,
            ...(!datenNeu.kategorie ? {} : { kategorie: {
                connectOrCreate: {
                    create: {
                        name: datenNeu.kategorie
                    },
                    where: {
                        name: datenNeu.kategorie
                    }
                }
            }})
        },
        include: {
            kategorie: true,
        }
    })
    .then(d => data = successHandle(d))
    .catch(e => data = errorHandle(400, "Etwas ist ungültig!"))

    return data
}

export async function test() {

}