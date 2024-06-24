import { useEffect, useState } from 'react';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import StarComp from "@/components/createRezepte/StarComp"
import TagAddWrapper from '@/components/createRezepte/TagAddWrapper';
import ZutatenAddWrapper from '@/components/createRezepte/ZutatenAddWrapper';
import TagAddItem from '@/components/createRezepte/TagAddItem';
import ZutatAddItem from '@/components/createRezepte/ZutatAddItem';

import { getTags } from '@/lib/tags/tag';
import { getZutaten } from '@/lib/zutaten/zutat';
import { getEinheiten } from '@/lib/einheiten/einheit';

export async function getServerSideProps() {
    let tags = await getTags()
    let zutaten = await getZutaten()
    let einheiten = await getEinheiten()
    return { props: { dataTags: tags.data, dataZutaten: zutaten.data, dataEinheiten: einheiten.data} }
}

export default function Home({ dataTags, dataZutaten, dataEinheiten }) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [duration, setDuration] = useState(0)
    const [image, setImage] = useState("")
    const [file, setFile] = useState("")

    const [bewertung, setBewertung] = useState(0)
    const [schwierigkeit, setSchwierigkeit] = useState(0)

    const [tags, setTags] = useState([])


    function addTag(tag) {
        if (tags.includes(tag)) return
        setTags([...tags, tag])
    }

    function removeTag(tag) {
        setTags(tags.filter((e) => e !== tag))
    }

    const [zutaten, setZutaten] = useState([])

    function addZutat(zutat) {
        zutat.quantity = parseInt(zutat.quantity)
        setZutaten([...zutaten, zutat])
    }

    function removeZutat(name) {
        setZutaten(zutaten.filter((e) => e.name !== name))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let data = await fetch("/api/rezepte", {
            method: "POST",
            body: JSON.stringify(
                {
                    name,
                    duration: parseInt(duration),
                    image: null,
                    file: null,
                    description,
                    difficulty: schwierigkeit,
                    rating: bewertung,
                    tags,
                    zutaten,
                }
            )
        })
        console.log(await data.json())
    }
    
    return (
        <div className='container'>
            <Form className='md:w-5/6 mx-auto' onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="p-2" controlid="formName">
                    <Form.Label>Rezept-Name:</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Gib Rezept-Name ein!" />
                </Form.Group>

                <Form.Group className="p-2" controlid="formDescription">
                    <Form.Label>Beschreibung:</Form.Label>
                    <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Gib Beschreibung ein!" />
                </Form.Group>

                <div className='md:grid md:grid-cols-3 px-2' controlid='formDetails'>
                    <Form.Group className='flex flex-col'>
                        <Form.Label>Bewertung:</Form.Label>
                        <StarComp stars={bewertung} setStars={setBewertung}/>
                    </Form.Group>
                    <Form.Group className='flex flex-col'>
                        <Form.Label>Schwierigkeit:</Form.Label>
                        <StarComp stars={schwierigkeit} setStars={setSchwierigkeit}/>
                    </Form.Group>
                    <Form.Group className='flex flex-col'>
                        <Form.Label>Dauer:</Form.Label>
                        <Form.Control value={duration} onChange={(e) => setDuration(e.target.value)} className='p-2 h-full min-h-12' type='number' placeholder='(Minuten)' />
                    </Form.Group>
                </div>

                <Form.Group className='p-2' controlid='formImage'>
                    <Form.Label>Bild:</Form.Label>
                    <Form.Control onChange={(e) => setImage(e.target.files[0])} type='file'/>
                </Form.Group>

                <Form.Group className='p-2' controlid='formImage'>
                    <Form.Label>Datei:</Form.Label>
                    <Form.Control onChange={(e) => setFile(e.target.files[0])} type='file'/>
                </Form.Group>

                <Form.Group className='p-2' controlid='formTag'>
                    <Form.Label>Tags:</Form.Label>
                    <TagAddWrapper addTag={addTag} tags={dataTags}/>
                    {tags.map((tag) => { 
                        return <TagAddItem remove={removeTag} key={tag} tagName={tag}/>
                    })}
                </Form.Group>

                <Form.Group className='p-2' controlId='formZutaten'>
                    <Form.Label>Zutaten:</Form.Label>
                    <ZutatenAddWrapper einheiten={dataEinheiten} addZutat={addZutat} zutaten={dataZutaten}/>
                    {zutaten.map((zutat) => { 
                        return <ZutatAddItem remove={removeZutat} anzahl={zutat.quantity} einheit={zutat.einheit} zutatName={zutat.name} key={zutat.name} />
                    })}
                </Form.Group>
                <Form.Group className='p-2'>
                    <Button variant='secondary' type='submit'>
                        Rezept Erstellen
                    </Button>
                </Form.Group>
                
            </Form>

        </div>
        
        
    );
}