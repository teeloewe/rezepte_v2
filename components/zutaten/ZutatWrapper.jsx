import ZutatItem from "./ZutatItem"

const ZutatWrapper = ({ zutaten, remove }) => {

    return (
        <div className="p-2 wrapper" >
            {zutaten.map(z => {
                return  <ZutatItem remove={remove} key={z.id} zutatName={z.name}/>
            })}
        </div>
    )
}

export default ZutatWrapper