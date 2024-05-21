import StarSvg from "../svg/StarSvg";
import { useEffect, useRef } from "react";

const StarComp = ({ stars, setStars }) => {
    const divRef = useRef(0)

    useEffect(() => {
        for (let child of divRef.current.children) {
            child.classList.remove("svg-star-yellow")
        }

        for (let i = 0; i < stars; i++) {
            divRef.current.children[i].classList.add("svg-star-yellow")
        }
    }, [stars])

    function selectStar(n, e) {
        setStars(n)
    }

    return (
        <div ref={divRef} className="flex flex-row">
            <StarSvg className="svg-star" onClick={(e) => selectStar(1, e)}/>
            <StarSvg className="svg-star" onClick={(e) => selectStar(2, e)}/>
            <StarSvg className="svg-star" onClick={(e) => selectStar(3, e)}/>
            <StarSvg className="svg-star" onClick={(e) => selectStar(4, e)}/>
            <StarSvg className="svg-star" onClick={(e) => selectStar(5, e)}/>
        </div>
    );
}

export default StarComp
