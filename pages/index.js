import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Link from "next/link";
import TestComp from "@/components/TestComp";
import { getAllRezepte } from "@/lib/rezepte/rezeptGet";
import NavBarComp from "@/components/NavBarComp";

export async function getServerSideProps() {
  let data = (await getAllRezepte())
  data = JSON.parse(JSON.stringify(data))
  return { props: { data } }
}

export default function Home({ data }) {

  return (
    <>
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <TestComp rezepte={data.data} />
      <Link href="/rezepte/create">Rezept erstellen</Link>
    </main>
    </>
    
  );
}
