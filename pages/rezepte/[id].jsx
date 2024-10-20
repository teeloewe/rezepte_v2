import { useRouter } from "next/router"
import { getAllRezepte } from "@/lib/rezepte/rezeptGet"
import { getRezeptById } from "@/lib/rezepte/rezeptGet"
import RezeptWrapper from "@/components/showRezept/RezeptWrapper"
import { useState } from "react"
import ChangeModal from "@/components/showRezept/ChangeModal"

export async function getStaticPaths() {
    const rezepte = await getAllRezepte() 
    const paths = rezepte.data.map((r) => {
        return {
            params: {
                id: r.id
            },
        }
    })    

    return {
        paths,
        fallback: true,
    }
}

export async function getStaticProps({ params }) {
    const { id } = params
    const rezept = JSON.parse(JSON.stringify(await getRezeptById(id)))
    return {
        props: { dataRezept: rezept },
        revalidate: 5,
    }
}   

export default function Home({ dataRezept }) {
    const router = useRouter()

    if (router.isFallback) return (
        <h1>Loading...</h1>
    )

    if (dataRezept.code === 400) return (
        <h1>{dataRezept.error}</h1>
    )

    const [rezept, setRezept] = useState(dataRezept.data)
    const [name, setName] = useState(dataRezept.data.name)
    const [show, setShow] = useState(false)

    const handleClose = async () => {
        update()
        setShow(false)
    }
    const handleShow = () => setShow(true)

    async function update() {
        console.log(rezept)
        let res = await fetch(`/api/rezepte/${name}`, {
            method: "PUT",
            body: JSON.stringify({
                ...rezept,
                tags: rezept.tags.map(tag => tag.name),
                zutaten: rezept.zutaten.map(zutat => {
                    return {
                        name: zutat.zutat.name,
                        quantity: zutat.quantity,
                        einheit: zutat.einheit.name
                    }
                })
            })
        })
        if (res.status !== 200) {
            console.log("fehler")
        }
        const data = await res.json()
        setName(rezept.name)
        console.log(data)
    }

    return (
        <>
            <RezeptWrapper rezept={rezept} handleShow={handleShow} />
            <ChangeModal rezept={rezept} setRezept={setRezept} show={show} handleClose={handleClose} />
        </>

    )
}