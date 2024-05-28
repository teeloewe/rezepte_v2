import { useRouter } from "next/router"
import { getAllRezepte } from "@/lib/rezepte/rezeptGet"

export async function getStaticPaths() {
    const rezepte = await getAllRezepte()
    const paths = rezepte.data.map((r) => {
        return {
            params: {
                name: r.name
            }
        }
    })    

    return {
      paths,
      fallback: true,
    }
  }

export async function getStaticProps({ params }) {
    const { name } = params
    return { props: { name } }
}   

export default function Home({name}) {
    const router = useRouter()
    if (router.isFallback) return (
        <h1>Loading...</h1>
    )

    return (
        <h1>{name}</h1>
    )
}