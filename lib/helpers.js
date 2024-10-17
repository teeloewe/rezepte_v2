export function errorHandle(code, name) {
    return {
        error: name,
        code,
        data: {}
    }
}

export function successHandle(data) {
    return {
        error: {},
        code: 200,
        data
    }
}

export const includeRezeptObj = {
    tags: {
        select: {
            name: true,
            kategorie: {
                select: {
                    name: true,
                }
            }
        }
    },
    zutaten: {
        select: {
            quantity: true,
            zutat: {
                select:  {
                    name: true
                }
            },
            einheit: {
                select: {
                    name: true
                }
            }
        }
    }
}

export function compare ( a, b ) {
    const name1 = a.name.toLowerCase()
    const name2 = b.name.toLowerCase()

    if ( name1 < name2 ) return -1
    if ( name1 > name2 ) return 1
    return 0
}

export async function getFile(req, chunks) {
    const buffer = Buffer.concat(chunks);

    const boundary = `--${req.headers["content-type"].split("boundary=")[1]}`;

    const bufferString = buffer.toString();

    const filenameMatch = bufferString.match(/filename="(.+?)"/);
    if (!filenameMatch) {
        return res
            .status(400)
            .json({ message: "Fehler beim Extrahieren des Dateinamens." });
    }
    const originalFilename = filenameMatch[1];

    const startOfFile = buffer.indexOf(Buffer.from("\r\n\r\n", "utf-8")) + 4;
    const endOfFile =
        buffer.indexOf(Buffer.from(boundary, "utf-8"), startOfFile) - 4;
    const fileContent = buffer.slice(startOfFile, endOfFile);

    return [originalFilename, fileContent]
}