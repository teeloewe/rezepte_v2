import Form from 'react-bootstrap/Form'
import StarComp from "@/components/StarComp"

export default function Home() {

    
    return (
        <div className='container'>
            <Form className='w-5/6 mx-auto'>
                <Form.Group className="p-2" controlId="formName">
                    <Form.Label>Rezept-Name:</Form.Label>
                    <Form.Control type="text" placeholder="Gib Rezept-Name ein!" />
                </Form.Group>

                <Form.Group className="p-2" controlId="formDescription">
                    <Form.Label>Beschreibung:</Form.Label>
                    <Form.Control as="textarea" placeholder="Gib Beschreibung ein!" />
                </Form.Group>
                <Form.Group className='grid grid-cols-3 px-2' controlId='formDetails'>
                    <Form.Label>Bewertung:</Form.Label>
                    <Form.Label>Schwierigkeit:</Form.Label>
                    <Form.Label>Dauer:</Form.Label>
                </Form.Group>
                <Form.Group className='grid grid-cols-3 p-2'>
                    <StarComp />
                    <StarComp />
                    <Form.Control type='number' placeholder='Gib Dauer vom Rezept ein!' />
                </Form.Group>
                <Form.Group className='p-2' controlId='formImage'>
                    <Form.Label>Bild:</Form.Label>
                    <Form.Control type='file'/>
                </Form.Group>
                <Form.Group className='p-2' controlId='formImage'>
                    <Form.Label>Datei:</Form.Label>
                    <Form.Control type='file'/>
                </Form.Group>
                <Form.Group>
                    
                </Form.Group>
                
            </Form>
        </div>
        
        
    );
}