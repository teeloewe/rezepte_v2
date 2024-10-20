import prisma from "../client";
import { errorHandle, successHandle } from "../helpers";

// Alle Zutaten bekommen
export async function getZutaten() {
    return successHandle(await prisma.zutat.findMany({
        orderBy: {
            name: "asc"
        }
    }));
}

// Zutat nach name filtern
export async function getZutat(name) {
    if (!name) return errorHandle(400, "Bitte gib etwas ein!")

    let data = await prisma.zutat.findUnique({
    where: {
        name,
    },
    });

    return (data ? successHandle(data) : errorHandle(400, "Zutat ist nicht in der Datenbank!"))
}

// Zutat erstellen
export async function createZutat(name) {
    if (!name) return errorHandle(400, "Bitte gib etwas ein!")

    let data = null;
    await prisma.zutat.create({
        data: {
            name,
        },
    })
    .then((d) => (data = successHandle(d)))
    .catch((e) => (data = errorHandle(400, "Diese Zutat ist schon in der Datenbank!")));

    return data
}

// Zutat nach name löschen
export async function deleteZutat(name) {
    if (!name) return errorHandle(400, "Bitte gib etwas ein!")

    let data = null
    await prisma.zutat.delete({
        where: {
            name,
        }
    })
    .then((d) => data = successHandle(d))
    .catch((e) => data = errorHandle(400, "Löschen Fehlgeschlagen!"))

    return data
}

// Zutat nach name bearbeiten
export async function updateZutat(nameAlt, nameNeu) {
    if (!nameAlt || !nameNeu) return errorHandle(400, "Bitte gib etwas ein!")

    let data = null
    await prisma.zutat.update({
        where: {
            name: nameAlt
        },
        data: {
            name: nameNeu
        }
    })
    .then((d) => data = successHandle(d))
    .catch(e => data = errorHandle(400, "Etwas ist ungültig!")) 

    return data
}

export async function test() {
    
}
