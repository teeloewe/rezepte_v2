import prisma from "../client";
import { successHandle, errorHandle } from "../helpers";
//! Vielleicht einheiten FIXEN damit keine Unordnung wegen EL, el, El

// Alle Einheiten bekommen
export async function getEinheiten() {
    return successHandle(await prisma.einheit.findMany());
}

// Einheit nach name filtern
async function getEinheit(name) {
    if (!name) return errorHandle(400, "Bitte gib etwas ein!")

    let data = await prisma.einheit.findUnique({
    where: {
        name,
    },
    });

    return (data ? successHandle(data) : errorHandle(400, "Einheit ist nicht in der Datenbank!"))
}

// Einheit erstellen
async function createEinheit(name) {
    if (!name) return errorHandle(400, "Bitte gib etwas ein!")

    let data = null;
    await prisma.einheit.create({
        data: {
            name,
        },
    })
    .then((d) => (data = successHandle(d)))
    .catch((e) => (data = errorHandle(400, "Diese Einheit ist schon in der Datenbank!")));

    return data;
}

// Einheit nach name löschen
async function deleteEinheit(name) {
    if (!name) return errorHandle(400, "Bitte gib etwas ein!")

    let data = null
    await prisma.einheit.delete({
        where: {
            name,
        }
    })
    .then((d) => data = successHandle(d))
    .catch((e) => data = errorHandle(400, "Löschen Fehlgeschlagen!"))

    return data
}

// Einheit nach name bearbeiten
// Unnötig in der Praxis
async function updateEinheit(nameAlt, nameNeu) {
    if (!nameAlt || !nameNeu) return errorHandle(400, "Bitte gib etwas ein!")

    let data = null
    await prisma.einheit.update({
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