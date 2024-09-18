import Button from "react-bootstrap/Button"
import MinusSvg from '../svg/MinusSvg'

const ZutatAddItem = ({ remove, zutatName, anzahl, einheit }) => {
    return (
        <div className="create-add-item zutat-add-item my-2 p-0" variant={'light'}>
            <span className="px-2 py-2">{anzahl}</span>
            <span className="px-2 py-2">{einheit}</span>
            <span className="px-2 py-2">{zutatName}</span>
            <Button variant="secondary" className="" onClick={() => remove(zutatName)}><MinusSvg /></Button>
        </div>
    )
}

export default ZutatAddItem