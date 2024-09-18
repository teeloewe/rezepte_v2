import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SelectZutaten from './SelectZutaten'
import SelectTagsWrapper from './SelectTagsWrapper'
import StarComp from '../createRezepte/StarComp'
import { useEffect, useState } from 'react'

const ModalForm = ({ zutaten, tags, kategorien, setFilter, filter }) => {
    function setDifficulty(diff) {
        setFilter({...filter, difficulty: diff})
    }

    function setRating(rating) {
        console.log(rating)
        setFilter({...filter, rating: rating})
    }

    function setDuration(duration) {
        setFilter({...filter, duration: duration})
    }

    return (
        <Form>
            <Form.Group className='p-2'>
                <Form.Label>Schwierigkeit kleiner als</Form.Label>
                <StarComp stars={filter.difficulty} setStars={setDifficulty}/>
            </Form.Group>
            <Form.Group className='p-2'>
                <Form.Label>Bewertung grösser als</Form.Label>
                <StarComp stars={filter.rating} setStars={setRating} />
            </Form.Group>
            <Form.Group className='p-2'>
                <Form.Label>Dauert weniger als ... Minuten</Form.Label>
                <Form.Control type='number' value={filter.duration} onChange={(e) => setDuration(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group className='p-2'>
                <Form.Label>Beeinhaltet Folgende Zutaten</Form.Label>
                <SelectZutaten zutaten={zutaten} setFilter={setFilter} filter={filter}/>
            </Form.Group>
            <SelectTagsWrapper kategorien={kategorien} tags={tags} setFilter={setFilter} filter={filter}/>
        </Form>
    )
}

export default ModalForm