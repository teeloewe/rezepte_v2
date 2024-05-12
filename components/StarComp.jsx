import StarSvg from "./StarSvg";
import { useEffect, useState } from "react";

export default function StarComp() {
    const [stars, setStars] = useState(0)



    function selectStar(n) {
        console.log("GAY")
    }

    return (
        <div className="flex flex-row">
            <StarSvg className="svg-star" onClick={selectStar(1)}/>
            <StarSvg className="svg-star" onClick={selectStar(2)}/>
            <StarSvg className="svg-star" onClick={selectStar(3)}/>
            <StarSvg className="svg-star" onClick={selectStar(4)}/>
            <StarSvg className="svg-star" onClick={selectStar(5)}/>
        </div>
    );
}
