import { useState } from 'react';

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
import { getKategorien } from '@/lib/kategorien/kategorie';
import AiModal from '@/components/createRezepte/AiModal';

export async function getServerSideProps() {
    let tags = await getTags()
    let zutaten = await getZutaten()
    let einheiten = await getEinheiten()
    let kategorien = await getKategorien()
    return { props: { dataTags: tags.data, dataZutaten: zutaten.data, dataEinheiten: einheiten.data, dataKategorien: kategorien.data} }
}

export default function Home({ dataTags, dataZutaten, dataEinheiten, dataKategorien }) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [duration, setDuration] = useState(0)
    const [image, setImage] = useState("")
    const [imageName, setImageName] = useState("")
    const [file, setFile] = useState("")
    const [fileName, setFileName] = useState("")

    const [bewertung, setBewertung] = useState(0)
    const [schwierigkeit, setSchwierigkeit] = useState(0)

    const [error, setError] = useState("")

    const [aiShow, setAiShow] = useState(false)
    const handleAiClose = () => setAiShow(false)
    const handleAiShow = () => setAiShow(true)
    
    const [tags, setTags] = useState([])

    function addTag(tag) {
        if (tags.includes(tag)) return
        setTags([...tags, tag])
    }

    function removeTag(tag) {
        setTags(tags.filter((e) => e !== tag))
    }

    const [zutaten, setZutaten] = useState([])

    async function addZutat(zutat) {
        if(!dataZutaten.some(z => z.name.toLowerCase() == zutat.name.toLowerCase())) {
            const res = await fetch('/api/zutaten', {
                method: 'POST',
                body: JSON.stringify({
                    name: zutat.name
                })
            })
            const data = await res.json()
            if (!data.code === 200) return
            dataZutaten.push(data.data)
        }
        if (zutaten.some(z => z.name === zutat.name)) return
        zutat.quantity = parseInt(zutat.quantity)
        console.log(zutat)
        setZutaten(prev => [...prev, zutat])
        console.log(zutaten)
    }

    function removeZutat(name) {
        setZutaten(zutaten.filter((e) => e.name !== name))
    }

    async function updateImage(img) {
        setImage(img)
        const formData = new FormData()
        formData.append("file", img)
        const res = await fetch(`/api/upload`, {
            method: "POST",
            body: formData
        })
        if (res.status !== 200) return console.log("fehler")
        const data = await res.json()
        console.log(data.name)
        setImageName(data.name)
    }

    async function updateFile(datei) {
        setFile(datei)
        const formData = new FormData()
        formData.append("file", datei)
        const res = await fetch(`/api/upload`, {
            method: "POST",
            body: formData
        })
        if (res.status !== 200) return console.log("fehler")
        const data = await res.json()
        console.log(data.name)
        setFileName(data.name)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let res = await fetch("/api/rezepte", {
            method: "POST",
            body: JSON.stringify(
                {
                    name,
                    duration: parseInt(duration),
                    image: imageName,
                    file: fileName,
                    description,
                    difficulty: schwierigkeit,
                    rating: bewertung,
                    tags,
                    zutaten,
                }
            )
        })
        let data = await res.json()
        if (data.code !== 200) {
            return setError(data.error)
        }
        setName("")
        setDescription("")
        setDuration("")
        setImage("")
        setFile("")
        setBewertung(0)
        setSchwierigkeit(0)
        setTags([])
        setZutaten([])
        setImageName("")
        setFileName("")
        setError("")
    }

    function addAiData(aiData) {
        setName(aiData.name)
        setDescription(aiData.description)
        aiData.zutaten.forEach(z => addZutat(z))
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
                    <Form.Control onChange={(e) => updateImage(e.target.files[0])}  type='file'/>
                </Form.Group>

                <Form.Group className='p-2' controlid='formImage'>
                    <Form.Label>Datei:</Form.Label>
                    <Form.Control onChange={(e) => updateFile(e.target.files[0])} type='file'/>
                    {fileName && <Form.Text>File: {fileName}</Form.Text>}
                </Form.Group>

                <Form.Group className='p-2' controlid='formTag'>
                    <Form.Label>Tags:</Form.Label>
                    <TagAddWrapper addTag={addTag} tags={dataTags} kategorien={dataKategorien}/>
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
                    <Button className='mx-1' variant='secondary' type='button' onClick={handleAiShow}>
                        Rezept mit KI hinzufügen
                    </Button>
                    {<span className='text-red-600'>{error}</span>}
                </Form.Group>
                
            </Form>

            <AiModal show={aiShow} handleClose={handleAiClose} einheiten={dataEinheiten} addAiData={addAiData} setFileName={setFileName}/>
        </div>
        
        
    );
}