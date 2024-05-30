import { useState } from "react"
import Image from "next/image"
import bolo from "@/public/bolo.webp"
import StarCompLite from "./StarCompLite"


const RezeptWrapper = ({dataRezept}) => {
    const [rezept, setRezept] = useState(dataRezept)
    const dateFormatter = new Intl.DateTimeFormat('de', {  day: '2-digit', month: '2-digit', year: 'numeric'})

    return (
        <div className="lg:w-1/2 mx-auto bg-gray-100">
            <div className="p-2">
                <h1>{rezept.name}</h1>
            </div>
            <div className="p-2">   
                {<Image src={bolo} alt="suck"/>}
            </div>
            <div className="p-2 rezept-details">
                <div>
                    <div>
                        <span>Bewertung:</span>
                        <StarCompLite stars={rezept.rating}/>
                    </div>
                    <div>
                        <span>Schwierigkeit:</span>
                        <StarCompLite stars={rezept.difficulty} />
                    </div>
                    <span>Dauer: <b>{rezept.duration}</b> Minuten</span>
                </div>
            </div>
            <div className="p-2 rezept-tags">
                {rezept.tags.map(t => { return (
                    <span className="bg-gray-300 px-1 py-0.5 rounded" key={t.name}>{t.name}</span>
                )})}
            </div>
            <div className="p-2 rezept-anleitung">
                <div className="flex flex-col">
                    <span><b>Zutaten:</b></span>
                    {rezept.zutaten.map(z => { return (
                        <div className="rezept-zutaten" key={z.zutat.name}>
                            <span className="lg:text-right">{z.quantity}</span>
                            <span>{z.einheit.name}</span>
                            <span>{z.zutat.name}</span>
                        </div>
                    )})}
                </div>
                <div>
                    <span><b>Beschreibung:</b></span>
                    <div>{rezept.description}</div>
                </div>
            </div>
            <div>
                <span className="block text-right">Hinzugefügt am: {dateFormatter.format(new Date(rezept.createdAt))}</span>
                <span className="block text-right">Geändert am: {dateFormatter.format(new Date(rezept.updatedAt))}</span>
            </div>
        </div>
    )
}

export default RezeptWrapper