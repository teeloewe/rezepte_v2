import StarSvgSmall from "../svg/StarSvgSmall";
import { useEffect, useRef } from "react";

const StarCompBasic = ({ stars }) => {
    const divRef = useRef(0)

    useEffect(() => {
        for (let i = 0; i < stars; i++) {
            divRef.current.children[i].classList.add("svg-star-yellow")
        }
    }, [stars])

    return (
        <div ref={divRef} className="flex flex-row">
            <StarSvgSmall className="svg-star"/>
            <StarSvgSmall className="svg-star"/>
            <StarSvgSmall className="svg-star"/>
            <StarSvgSmall className="svg-star"/>
            <StarSvgSmall className="svg-star"/>
        </div>
    );
}

export default StarCompBasic
