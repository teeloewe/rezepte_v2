import prisma from "../client";
import { errorHandle, successHandle } from "../helpers";

// Alle Kategorien bekommen
export async function getKategorien() {
    return successHandle(await prisma.kategorie.findMany());
}

// Kategorie nach name filtern
export async function getKategorie(name) {
    if (!name) return errorHandle(400, "Bitte gib etwas ein!")

    let data = await prisma.kategorie.findUnique({
    where: {
        name,
    },
    });

    return (data ? successHandle(data) : errorHandle(400, "Kategorie ist nicht in der Datenbank!"))
}

// Kategorie erstellen
export async function createKategorie(name) {
    if (!name) return errorHandle(400, "Bitte gib etwas ein!")

    let data = null;
    await prisma.kategorie.create({
        data: {
            name,
        },
    })
    .then((d) => (data = successHandle(d)))
    .catch((e) => (data = errorHandle(400, "Diese Kategorie ist schon in der Datenbank!")));

    return data;
}

// Kategorie nach name löschen
export async function deleteKategorie(name) {
    if (!name) return errorHandle(400, "Bitte gib etwas ein!")

    let data = null
    await prisma.kategorie.delete({
        where: {
            name,
        }
    })
    .then((d) => data = successHandle(d))
    .catch((e) => data = errorHandle(400, "Löschen Fehlgeschlagen!"))

    return data
}

// Kategorie nach name bearbeiten
export async function updateKategorie(nameAlt, nameNeu) {
    if (!nameAlt || !nameNeu) return errorHandle(400, "Bitte gib etwas ein!")

    let data = null
    await prisma.kategorie.update({
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