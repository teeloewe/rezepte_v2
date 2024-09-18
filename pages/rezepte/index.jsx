import FilterModal from '@/components/filterRezepte/FilterModal';
import RezeptCard from '@/components/filterRezepte/RezeptCard';
import { defaultSortierung, nameOrders, possibleOrders } from '@/lib/constants';
import { getKategorien } from '@/lib/kategorien/kategorie';
import { getAllRezepte } from '@/lib/rezepte/rezeptGet';
import { getTags } from '@/lib/tags/tag';
import { getZutaten } from '@/lib/zutaten/zutat';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export async function getServerSideProps() {
    const zutaten = await getZutaten()
    const kategorien = await getKategorien()
    const tags = await getTags()
    const rezepte = await getAllRezepte()
    return { props: { dataZutaten: zutaten.data, dataKategorien: kategorien.data, dataTags: tags.data, dataRezepte: JSON.parse(JSON.stringify(rezepte.data)) } }
}


export default function Home({ dataZutaten, dataKategorien, dataTags, dataRezepte }) {
    const defaultFilter = {
        duration: 24*60,
        difficulty: 5,
        rating: 1,
        zutaten: [],
        tags: [],
        order: defaultSortierung
    }
    const [filter, setFilter] = useState(defaultFilter)
    const [filterShow, setFilterShow] = useState(false)
    
    const filterHandleShow = () => setFilterShow(true)
    const filterHandleClose = () => {
        setFilterShow(false)
    }

    const [results, setResults] = useState(dataRezepte)

    function handleReihenfolge(e) {
        setFilter({...filter, order: [filter.order[0], e.target.value]})
    }

    function handleSortierung(e) {
        setFilter({...filter, order: [e.target.value, filter.order[1]]})
    }

    async function applyFilters() {
        // setFilter({...filter, duration: (filter.duration ? parseInt(filter.duration) : 1440)})
        console.log(filter)
        const res = await fetch('/api/filter', {
            method: "POST",
            body: JSON.stringify({...filter, duration: (filter.duration ? parseInt(filter.duration) : 1440)})
        })
        const data = await res.json()
        console.log(data.data)
        setResults(data.data)
    }

    useEffect(() => {
        async function apply() {
            await applyFilters()
        }
        apply()
    }, [filter])

    return (
        <div className='container'>
            <div className='filter-wrapper mt-2'>
                <Button variant='secondary' onClick={filterHandleShow}>Filter</Button>
                <FilterModal handleClose={filterHandleClose} show={filterShow} zutaten={dataZutaten} tags={dataTags} kategorien={dataKategorien} setFilter={setFilter} filter={filter}/>
                <div className='flex flex-row items-center justify-end'>Sortiert Nach:</div>
                <Form.Select value={filter.order[0]} onChange={handleSortierung}>
                    {possibleOrders.map((order, index) => {
                        return <option key={order} value={order}>{nameOrders[index]}</option>
                    })}
                </Form.Select>
                <Form.Select value={filter.order[1]} onChange={handleReihenfolge}>
                    <option value="asc">Aufsteigend</option>
                    <option value="desc">Absteigend</option>
                </Form.Select>
            </div>
            {results.map(r => <RezeptCard key={r.name} rezept={r}/>)}
        </div>
        
        
    );
}