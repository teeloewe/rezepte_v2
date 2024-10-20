export const defaultSortierung = ["name", "asc"];
export const possibleOrders = [
    "rating",
    "difficulty",
    "duration",
    "createdAt",
    "updatedAt",
    "name",
];
export const nameOrders = [
    "Bewertung",
    "Schwierigkeit",
    "Dauer",
    "Erstellt",
    "Geändert",
    "Name",
];
export const OPENAI_INSTRUCTIONS = `Gib mir den Namen, den Instruktionen zum kochen (beschreibung) und die Zutaten von diesem Rezept in folgendem JSON Format zurück:
                        { name: .....,
                        description: .....,
                        zutaten: [{
                            name: ...,
                            quantity: ...,
                            einheit: ....}]
                        }   
                        Bei ganzen dingen kannst du (stück) als einheit einsetzen
                        Du kannst bei den Zutaten alle Worte nach den kommas weglassen und auch beschreibungen der zutaten weglassen
                        Gib nur JSON zurück und falls etwas nicht klar ist ersetze das feld mit null                    
                        `;
export function makeImageUrl(filename) {
    return `https://rezept-storage.s3.amazonaws.com/${filename}`
}
