import Form from 'react-bootstrap/Form'
import StarComp from "@/components/StarComp"

export default function Home() {

    
    return (
        <div className='container-sm'>
            <Form>
                <Form.Group className="p-2" controlId="formBasicName">
                    <Form.Label>Rezept-Name:</Form.Label>
                    <Form.Control type="text" placeholder="Gib Rezept-Name ein!" />
                </Form.Group>

                <Form.Group className="p-2" controlId="formBasicDescription">
                    <Form.Label>Beschreibung:</Form.Label>
                    <Form.Control as="textarea" placeholder="Gib Beschreibung ein!" />
                </Form.Group>
                <Form.Group>
                    <StarComp />
                </Form.Group>
            </Form>
        </div>
        
        
    );
}