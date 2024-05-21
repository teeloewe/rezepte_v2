import Form from 'react-bootstrap/Form'
import StarComp from "@/components/StarComp"
import Button from 'react-bootstrap/Button'
import { SearchBarTags } from '@/components/SearchBarTags';
import { SearchResultsList } from '@/components/SearchResultsList';
import { useState } from 'react';
import TagAddItem from '@/components/TagAddItem';

export default function Home() {
    const [tagResults, setTagResults] = useState([])
    const [tagInput, setTagInput] = useState("")
    
    return (
        <div className='container'>
            <Form className='md:w-5/6 mx-auto'>
                <Form.Group className="p-2" controlid="formName">
                    <Form.Label>Rezept-Name:</Form.Label>
                    <Form.Control type="text" placeholder="Gib Rezept-Name ein!" />
                </Form.Group>

                <Form.Group className="p-2" controlid="formDescription">
                    <Form.Label>Beschreibung:</Form.Label>
                    <Form.Control as="textarea" placeholder="Gib Beschreibung ein!" />
                </Form.Group>
                <div className='md:grid md:grid-cols-3 px-2' controlid='formDetails'>
                    <Form.Group className='flex flex-col'>
                        <Form.Label>Bewertung:</Form.Label>
                        <StarComp />
                    </Form.Group>
                    <Form.Group className='flex flex-col'>
                        <Form.Label>Schwierigkeit:</Form.Label>
                        <StarComp />
                    </Form.Group>
                    <Form.Group className='flex flex-col'>
                        <Form.Label>Dauer:</Form.Label>
                        <Form.Control className='p-2 h-full min-h-12' type='number' placeholder='Gib Dauer vom Rezept ein!' />
                    </Form.Group>
                </div>
                <Form.Group className='p-2' controlid='formImage'>
                    <Form.Label>Bild:</Form.Label>
                    <Form.Control type='file'/>
                </Form.Group>
                <Form.Group className='p-2' controlid='formImage'>
                    <Form.Label>Datei:</Form.Label>
                    <Form.Control type='file'/>
                </Form.Group>
                <Form.Group className='p-2' controlid='formTag'>
                    <SearchBarTags setResults={setTagResults} input={tagInput} setInput={setTagInput}></SearchBarTags>
                    {tagResults && tagResults.length > 0 && <SearchResultsList setInput={setTagInput} results={tagResults}></SearchResultsList>}
                    <TagAddItem tagName={"Asiatisch"} />
                    <TagAddItem tagName={"Indisch"}/>
                    <TagAddItem tagName={"Sauce"}/>
                </Form.Group>
                
            </Form>
        </div>
        
        
    );
}