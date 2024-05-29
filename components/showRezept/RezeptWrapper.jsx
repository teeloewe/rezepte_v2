import { useState } from "react"
import Image from "next/image"
import bolo from "@/public/bolo.webp"
import StarCompLite from "./StarCompLite"


const RezeptWrapper = ({dataRezept}) => {
    const [rezept, setRezept] = useState(dataRezept)
    const dateFormatter = new Intl.DateTimeFormat('de', {  day: '2-digit', month: '2-digit', year: 'numeric'})

    return (
        <div className="container mx-auto">
            <div>
                <h1>{rezept.name}</h1>
            </div>
            <div>   
                {/* {<Image src={bolo} alt="suck"/>} */}
            </div>
            <div>
                <div>
                    <StarCompLite stars={rezept.rating}/>
                    <StarCompLite stars={rezept.difficulty} />
                    <span>{rezept.duration}</span>
                </div>
                <div>
                    <span className="block">{dateFormatter.format(new Date(rezept.createdAt))}</span>
                    <span className="block">{dateFormatter.format(new Date(rezept.updatedAt))}</span>
                </div>
            </div>
            <div>
                {rezept.tags.map(t => { return (
                    <span>{t.name}</span>
                )})}
            </div>
            <div>
                <div>
                    {rezept.zutaten.map(z => { return (
                        <span>{z.zutat.name}</span>
                    )})}
                </div>
                <div>
                    {rezept.description}
                </div>
            </div>
        </div>
    )
}

export default RezeptWrapper