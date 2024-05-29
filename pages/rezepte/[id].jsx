import { useRouter } from "next/router"
import { getAllRezepte } from "@/lib/rezepte/rezeptGet"
import { getRezeptById } from "@/lib/rezepte/rezeptGet"
import RezeptWrapper from "@/components/showRezept/RezeptWrapper"

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
    console.log(id)
    const rezept = JSON.parse(JSON.stringify(await getRezeptById(id)))
    return { props: { dataRezept: rezept } }
}   

export default function Home({ dataRezept }) {
    const router = useRouter()
    if (router.isFallback) return (
        <h1>Loading...</h1>
    )

    if (dataRezept.code === 400) return (
        <h1>{dataRezept.error}</h1>
    )

    return (
        <RezeptWrapper dataRezept={dataRezept.data} />
    )
}