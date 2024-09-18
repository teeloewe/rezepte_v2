import { getTags } from "@/lib/tags/tag";
import { getKategorien } from "@/lib/kategorien/kategorie";
import TagWrapper from "@/components/tags/TagWrapper";
import { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { compare } from "@/lib/helpers";

export async function getServerSideProps() {
    let tags = await getTags()
    let kategorien = await getKategorien()
    return { props: { dataTags: tags.data, dataKategorien: kategorien.data } }
}


export default function Home({ dataTags, dataKategorien }) {
    const [tags, setTags] = useState(dataTags)
    const [newTag, setNewTag] = useState("")
    const [kategorien, setKategorien] = useState(dataKategorien)
    const [kategorie, setKategorie] = useState(dataKategorien[0].name)
    const [newKategorie, setNewKategorie] = useState("")

    async function handleTagSubmit(e) {
        e.preventDefault()
        const res = await fetch('/api/tags', {
            method: "POST",
            body: JSON.stringify({
                name: newTag,
                kategorie,
            })
        })
        const data = await res.json()
        console.log(data)
        if (data.code === 200) {
            setTags([...tags, data.data].sort(compare))
            setNewTag("")
        }
    }

    async function handleKategorieSubmit(e) {
        e.preventDefault()
        const res = await fetch('/api/kategorien', {
            method: "POST",
            body: JSON.stringify({ name: newKategorie })
        })
        const data = await res.json()
        console.log(data)
        if (data.code === 200) {
            setKategorien([...kategorien, data.data])
            setNewKategorie("")
        }
    }

    async function remove(tag) {
        const res = await fetch(`/api/tags/${tag}`, {
            method: "DELETE"
        })
        const data = await res.json()
        console.log(data)
        if (data.code === 200) {
            setTags(tags.filter(t => t.name !== tag))
        }
    }

    return (
        <div className="container">
            <Form className='md:w-5/6 mx-auto' onSubmit={(e) => handleTagSubmit(e)}>
                <Form.Group className="p-2" controlid="formName">
                    <Form.Label>Tag Hinzufügen:</Form.Label>
                    <div className="tag-add">
                        <Form.Control type="text" value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="Gib neues Tag ein!" />
                        <Form.Select value={kategorie} onChange={e => setKategorie(e.target.value)}>
                            {kategorien.map(e => {
                                return <option value={e.name} key={e.id}>{e.name}</option>
                            })}
                        </Form.Select>
                    </div> 
                </Form.Group>
                <Form.Group className='p-2'>
                    <Button variant='secondary' type='Submit'>Tag Hinzufügen</Button>
                </Form.Group>
                <TagWrapper remove={remove} tags={tags}/>  
            </Form>
            <Form className="md:w-5/6 mx-auto mt-2" onSubmit={(e) => handleKategorieSubmit(e)}>
                <Form.Group className="p-2" controlId="formKategorie">
                    <Form.Label>Kategorie Hinzufügen:</Form.Label>
                    <Form.Control type="text" value={newKategorie} onChange={(e) => setNewKategorie(e.target.value)} placeholder="Gib neue Kategorie ein!"/>
                </Form.Group>
                <Form.Group className='p-2'>
                    <Button variant='secondary' type='Submit'>Kategorie Hinzufügen</Button>
                </Form.Group>
            </Form>
        </div>
    )
}