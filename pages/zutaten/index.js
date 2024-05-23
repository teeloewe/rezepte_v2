import { useEffect, useState } from 'react';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { getZutaten } from '@/lib/zutaten/zutat';

export async function getServerSideProps() {
    let zutaten = await getZutaten()
    return { props: { dataZutaten: zutaten.data} }
}

export default function Home({ dataZutaten }) {
    const [newZutat, setNewZutat] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(newZutat)
    }


    return (
        <div className='container'>
            <Form className='md:w-5/6 mx-auto' onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="p-2" controlid="formName">
                    <Form.Label>Zutat Hinzufügen:</Form.Label>
                    <Form.Control type="text" value={newZutat} onChange={(e) => setNewZutat(e.target.value)} placeholder="Gib neue Zutat ein!" />
                </Form.Group>
                <Form.Group className='p-2'>
                    <Button variant='secondary' type='Submit'>Zutat Hinzufügen</Button>
                </Form.Group>  
            </Form>
        </div>
        
        
    );
}