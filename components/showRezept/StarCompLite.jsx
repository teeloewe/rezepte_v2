import StarSvg from "../svg/StarSvg";
import { useEffect, useRef } from "react";

const StarCompLite = ({ stars }) => {
    const divRef = useRef(0)

    useEffect(() => {
        for (let child of divRef.current.children) {
            child.classList.remove("svg-star-yellow")
        }

        for (let i = 0; i < stars; i++) {
            divRef.current.children[i].classList.add("svg-star-yellow")
        }
    }, [stars])

    return (
        <div ref={divRef} className="flex flex-row my-2">
            <StarSvg className="svg-star"/>
            <StarSvg className="svg-star"/>
            <StarSvg className="svg-star"/>
            <StarSvg className="svg-star"/>
            <StarSvg className="svg-star"/>
        </div>
    );
}

export default StarCompLite
