import Form from 'react-bootstrap/Form'

const AiModalZutaten = ({ data, zutat, setData, einheiten }) => {
    
    return (
        <div className='zutaten-add'>
            <Form.Control value={zutat.quantity || ""} onChange={(e) => setData({...data, zutaten: data.zutaten.map(z => z.name === zutat.name ? {...z, quantity: parseInt(e.target.value)} : z)})} type='number'  placeholder='Menge!'/>
            <Form.Select value={zutat.einheit || ""} onChange={e => setData({...data, zutaten: data.zutaten.map(z => z.name === zutat.name ? {...z, einheit: e.target.value} : z)})}>
                {einheiten.map(e => {
                    return <option value={e.name} key={e.id}>{e.name}</option>
                })}
            </Form.Select>
            <Form.Control className='h-100' type='text' placeholder='Gib Zutat-Name ein!' value={zutat.name || ""} onChange={(e) => setData(prev => {
                const updated = prev.zutaten.map(z => z.name === zutat.name ? { ...z,  name: e.target.value } : z)
                console.log(updated)
                return { ...prev, zutaten: updated }
            })}/>
        </div>
        
    );
};

export default AiModalZutaten