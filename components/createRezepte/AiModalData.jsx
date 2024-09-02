import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { use, useState } from 'react';
import AiModalZutaten from './AiModalZutaten';

const AiModalData = ({data, setData, einheiten}) => {
    console.log(data)
    return (
        <Form>
            <Form.Group>
                <Form.Label>Name:</Form.Label>
                <Form.Control value={data.name || ""} onChange={(e) => setData({ ...data, name: e.target.value })}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Beschreibung</Form.Label>
                <Form.Control as="textarea" value={data.description || ""} onChange={(e) => setData({...data, description: e.target.value})}/>
            </Form.Group>
            <Form.Label>Zutaten</Form.Label>
            {data.zutaten.map((zutat, index) => {
                return <AiModalZutaten data={data} setData={setData} zutat={zutat} einheiten={einheiten} key={index}/>
            })}
        </Form>
            
    )
}

export default AiModalData