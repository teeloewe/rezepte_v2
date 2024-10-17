import { useState } from "react"
import Image from "next/image"
import StarCompLite from "./StarCompLite"
import Button from "react-bootstrap/Button"
import { useRouter } from "next/router"
import { makeImageUrl } from "@/lib/constants"

const RezeptWrapper = ({dataRezept}) => {
    const [rezept, setRezept] = useState(dataRezept)
    const dateFormatter = new Intl.DateTimeFormat('de', {  day: '2-digit', month: '2-digit', year: 'numeric'})
    const router = useRouter()

    async function remove() {
        const res = await fetch(`/api/rezepte/${rezept.name}`, {
            method: "DELETE"
        })
        const data = await res.json()
        console.log(data)
        if (data.code === 200) {
            router.push("/rezepte")
        }
    }

    return (
        <div className="lg:w-1/2 mx-auto bg-gray-100">
            <div className="p-2 lg:flex justify-between gap-1">
                <h1 className="mr-auto">{rezept.name}</h1>
                {rezept.file && <Button onClick={() => window.location.assign(makeImageUrl(rezept.file))} variant="secondary">Rezept Öffnen</Button>}
                <Button onClick={() => remove()} variant="secondary">Rezept Löschen</Button>

            </div>
            {rezept.image && <div className="p-2 py-3">   
                {<Image src={makeImageUrl(rezept.image)} alt="suck" width={400} height={300}/>}
            </div>}

            <div className="p-2 rezept-wrapper">
                <div className="rezept-details">
                    <div>
                        <span><b>Bewertung</b></span>
                        <StarCompLite stars={rezept.rating}/>
                    </div>
                    <div>
                        <span><b>Schwierigkeit</b></span>
                        <StarCompLite stars={rezept.difficulty} />
                    </div>
                    <span>Dauer: <b>{rezept.duration}</b> Minuten</span>
                    <div className="rezept-tags">
                        {rezept.tags.map(t => { return (
                            <span className="bg-gray-300 px-1 py-0.5 rounded" key={t.name}>{t.name}</span>
                        )})}
                    </div>
                    <div className="flex flex-col">
                        <span><b>Zutaten</b></span>
                        {rezept.zutaten.map(z => { return (
                            <div className="rezept-zutaten" key={z.zutat.name}>
                                <span className="lg:text-right">{z.quantity}</span>
                                <span>{z.einheit.name}</span>
                                <span>{z.zutat.name}</span>
                            </div>
                        )})}
                    </div>
                </div>
                
                {rezept.description && <div className="rezept-anleitung">
                    <span><b>Beschreibung</b></span>
                    <div>{rezept.description}</div>
                </div>}
            </div>
            
            <hr></hr>
            <div>
                <span className="block text-right">Hinzugefügt am: {dateFormatter.format(new Date(rezept.createdAt))}</span>
                <span className="block text-right">Geändert am: {dateFormatter.format(new Date(rezept.updatedAt))}</span>
            </div>
        </div>
    )
}

export default RezeptWrapper