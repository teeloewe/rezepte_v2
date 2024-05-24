import Button from "react-bootstrap/Button"
import MinusSvg from '../svg/MinusSvg'

const ZutatItem = ({ zutatName, remove }) => {

    return (
        <div className="add-single-item create-add-item my-2 p-0" variant={'light'}>
            <span className="mx-2">{zutatName}</span>
            <Button variant="secondary" onClick={() => remove(zutatName)} className=""><MinusSvg /></Button>
        </div>
    )
}

export default ZutatItem