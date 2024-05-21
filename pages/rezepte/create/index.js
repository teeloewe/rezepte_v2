import Form from 'react-bootstrap/Form'
import StarComp from "@/components/createRezepte/StarComp"
import Button from 'react-bootstrap/Button'
import { SearchBarTags } from '@/components/createRezepte/SearchBarTags';
import { SearchResultsList } from '@/components/createRezepte/SearchResultsList';
import { SearchBarZutaten } from '@/components/createRezepte/SearchBarZutaten'
import { useEffect, useState } from 'react';
import TagAddItem from '@/components/createRezepte/TagAddItem';
import ZutatAddItem from '@/components/createRezepte/ZutatAddItem';

export default function Home() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [duration, setDuration] = useState(0)
    const [image, setImage] = useState("")
    const [file, setFile] = useState("")

    const [bewertung, setBewertung] = useState(0)
    const [schwierigkeit, setSchwierigkeit] = useState(0)

    const [tagResults, setTagResults] = useState([])
    const [tagInput, setTagInput] = useState("")

    const [zutatenResults, setZutatenResults] = useState([])
    const [zutatenInput, setZutatenInput] = useState("")

    useEffect(() => {
        console.log(bewertung)
        console.log(schwierigkeit)
    }, [bewertung, schwierigkeit])
    
    return (
        <div className='container'>
            <Form className='md:w-5/6 mx-auto'>
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
                        <Form.Control value={duration} onChange={(e) => setDuration(e.target.value)} className='p-2 h-full min-h-12' type='number' placeholder='Gib Dauer vom Rezept ein!' />
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
                    <SearchBarTags setResults={setTagResults} input={tagInput} setInput={setTagInput}/>
                    {tagResults && tagResults.length > 0 && <SearchResultsList setInput={setTagInput} results={tagResults}></SearchResultsList>}
                    <TagAddItem tagName={"Asiatisch"} />
                </Form.Group>

                <Form.Group className='p-2' controlId='formZutaten'>
                    <Form.Label>Zutaten:</Form.Label>
                    <SearchBarZutaten setResults={setZutatenResults} input={zutatenInput} setInput={setZutatenInput}/>
                    {zutatenResults && zutatenResults.length > 0 && <SearchResultsList setInput={setZutatenInput} results={zutatenResults}></SearchResultsList>}
                    <ZutatAddItem anzahl={500} einheit={"Gramm"} zutatName={"Lauch"} />
                    <ZutatAddItem anzahl={5} einheit={"Esslöffel"} zutatName={"Käse"} />
                </Form.Group>
            </Form>
        </div>
        
        
    );
}