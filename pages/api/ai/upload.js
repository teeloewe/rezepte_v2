import path from "path";
import fs from "fs";
import multer from "multer"
import { analyseFile } from "@/lib/ai/chatgpt";

let fileName = null

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            const uploadDir = path.join(process.cwd(), 'public', 'uploads');

            // Verzeichnis erstellen, falls es nicht existiert
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            cb(null, uploadDir);
        },
        filename: function (req, file, cb) {
            fileName = file.originalname
            cb(null, file.originalname); // Speichere die Datei mit ihrem ursprünglichen Namen
        },
        
    }),
});

export const config = {
    api: {
      bodyParser: false, // Deaktiviert das automatische Body-Parsing
    },
};

export default function handler(req, res) {
    if (req.method === "POST") {
        console.log(req.file)
        upload.single('file')(req, res, async function (err) {
            if (err) {
                return res.status(500).json({ message: 'Fehler beim Hochladen der Datei.', error: err.message });
            }
            const data = await analyseFile(fileName)
            return res.status(200).json(JSON.stringify(data));
        });
        
        
    } else {
        res.status(200).json({name: "India"})
    }
    
}
// export default async function handler(req, res) {
//     if (req.method === "POST") {
//         const chunks = [];

//         // Datenstücke sammeln
//         req.on("data", (chunk) => {
//             chunks.push(chunk);
//         });

//         req.on("end", () => {
//             const buffer = Buffer.concat(chunks);

//             // Extrahiere den Boundary-String aus dem Content-Type Header
//             const boundary = `--${req.headers["content-type"].split("boundary=")[1]}`;

//             // Konvertiere den gesamten Buffer in einen String
//             const bufferString = buffer.toString();

//             // Finde die Position des Dateinamens
//             const filenameMatch = bufferString.match(/filename="(.+?)"/);
//             if (!filenameMatch) {
//                 return res
//                     .status(400)
//                     .json({ message: "Fehler beim Extrahieren des Dateinamens." });
//             }
//             const originalFilename = filenameMatch[1];

//             // Finde den Start des Dateiinhalts
//             const startOfFile = buffer.indexOf(Buffer.from("\r\n\r\n", "utf-8")) + 4;
//             const endOfFile =
//                 buffer.indexOf(Buffer.from(boundary, "utf-8"), startOfFile) - 4;

//             const fileContent = buffer.slice(startOfFile, endOfFile);

//             // Erstelle den Dateipfad
//             const uploadDir = path.join(process.cwd(), "public", "uploads");
//             if (!fs.existsSync(uploadDir)) {
//                 fs.mkdirSync(uploadDir, { recursive: true });
//             } 

//             // Speichere die Datei unter ihrem ursprünglichen Namen
//             const filePath = path.join(uploadDir, originalFilename);
//             fs.writeFileSync(filePath, fileContent);

//             res.status(200).json({ message: "Datei erfolgreich hochgeladen." });
//             });

//             req.on("error", (err) => {
//             res.status(500).json({ message: "Fehler beim Hochladen der Datei." });
//             });
//         } else {
//             res.status(405).json({ message: "Methode nicht erlaubt." });
//         }
// }
