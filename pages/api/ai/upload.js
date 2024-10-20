import { analyseFile } from "@/lib/ai/chatgpt";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getFile } from '@/lib/helpers';

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

async function  uploadFileToS3(file, fileName) {
    let ext = fileName.split(".").pop()
    if (!ext || ext != "png" && ext != "jpg") return null

    const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: `${fileName}`,
        Body: file,
        ContentType: `image/${ext}`
    }

    const command = new PutObjectCommand(params)
    await s3Client.send(command);
    return fileName
}

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method === "POST") {
        
        const chunks = [];

        // Datenstücke sammeln
        req.on("data", (chunk) => {
            chunks.push(chunk);
        });

        req.on("end", async () => {
            try {
                const [originalFilename, fileContent] = await getFile(req, chunks);
                const fileName = await uploadFileToS3(fileContent, originalFilename);
                console.log(fileName)
                if (!fileName) return res.status(400).json({ message: "Datei Fehler" })
                const data = await analyseFile(fileName);
                
                console.log("File successfully uploaded and analyzed");

                res.status(200).json({ data: data, name: fileName });
            } catch (error) {
                console.log(error)
                res.status(500).json({ message: "Fehler beim Hochladen der Datei." });
            }
        });

        await req.on("error", (err) => {
            return res.status(500).json({ message: "Fehler beim Hochladen der Datei." });
        });

    } else {
        res.status(405).json({ message: "Methode nicht erlaubt." });
    }
}

