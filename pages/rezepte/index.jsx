import FilterModal from '@/components/filterRezepte/FilterModal';
import { getKategorien } from '@/lib/kategorien/kategorie';
import { getTags } from '@/lib/tags/tag';
import { getZutaten } from '@/lib/zutaten/zutat';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button'

export async function getServerSideProps() {
    const zutaten = await getZutaten()
    const kategorien = await getKategorien()
    const tags = await getTags()
    return { props: { dataZutaten: zutaten.data, dataKategorien: kategorien.data, dataTags: tags.data } }
}

export default function Home({ dataZutaten, dataKategorien, dataTags }) {
    const defaultFilter = {
        duration: 24*60,
        difficulty: 5,
        rating: 1,
        zutaten: [],
        tags: []
    }
    const [filter, setFilter] = useState(defaultFilter)
    const [filterShow, setFilterShow] = useState(false)
    
    const filterHandleShow = () => setFilterShow(true)
    const filterHandleClose = () => {
        setFilterShow(false)
        applyFilters()
    }

    useEffect(() => {
        console.log(filter)
    }, [filter])

    async function applyFilters() {
        setFilter({...filter, duration: (filter.duration ? parseInt(filter.duration) : 1440)})
        console.log(filter)
        const res = await fetch('/api/filter', {
            method: "POST",
            body: JSON.stringify(filter)
        })
        const data = await res.json()
        console.log(data)
    }

    return (
        <div className='container'>
            <Button variant='secondary' onClick={filterHandleShow}>Filter</Button>
            <FilterModal handleClose={filterHandleClose} show={filterShow} zutaten={dataZutaten} tags={dataTags} kategorien={dataKategorien} setFilter={setFilter} filter={filter}/>
        </div>
        
        
    );
}