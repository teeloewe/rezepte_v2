import { useState } from 'react';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { getZutaten } from '@/lib/zutaten/zutat';
import ZutatWrapper from '@/components/zutaten/ZutatWrapper';
import { compare } from '@/lib/helpers';

export async function getServerSideProps() {
    let zutaten = await getZutaten()
    return { props: { dataZutaten: zutaten.data} }
}

export default function Home({ dataZutaten }) {
    const [zutaten, setZutaten] = useState(dataZutaten)
    const [newZutat, setNewZutat] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        const res = await fetch('/api/zutaten', {
            method: "POST",
            body: JSON.stringify({
                name: newZutat,
            })
        })
        const data = await res.json()
        console.log(data)
        if (data.code === 200) {
            setZutaten([...zutaten, data.data].sort(compare))
            setNewZutat("")
        }
        
    }

    async function remove(zutat) {
        const res = await fetch(`/api/zutaten/${zutat}`, {
            method: "DELETE"
        })
        const data = await res.json()
        console.log(data)
        if (data.code === 200) {
            setZutaten(zutaten.filter(z => z.name !== zutat))
        }
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
                <ZutatWrapper remove={remove} zutaten={zutaten}/>  
            </Form>
        </div>
        
        
    );
}