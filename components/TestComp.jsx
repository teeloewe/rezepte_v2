import { useEffect } from "react";
import Link from "next/link";

const TestComp = ({ rezepte }) => {
    useEffect(() => {
        console.log(rezepte)
    }, [rezepte])

    return (
        <>
            {rezepte.map((r) => {
                return <Link href={`/rezepte/${r.id}`} key={r.name}>{r.name}</Link>;
            })}
        </>
    );
}

export default TestComp
