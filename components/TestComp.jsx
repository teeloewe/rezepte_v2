import { useEffect } from "react";

const TestComp = ({ rezepte }) => {
    useEffect(() => {
        console.log(rezepte)
    }, [rezepte])

    return (
        <>
            {rezepte.map((r) => {
                return <h1 key={r.name}>{r.name}</h1>;
            })}
        </>
    );
}

export default TestComp
