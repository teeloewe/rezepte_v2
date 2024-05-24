import ZutatItem from "./ZutatItem"

const ZutatWrapper = ({ zutaten, remove }) => {

    return (
        <div className="p-2" >
            {zutaten.map(z => {
                return  <ZutatItem remove={remove} key={z.name} zutatName={z.name}/>
            })}
        </div>
    )
}

export default ZutatWrapper