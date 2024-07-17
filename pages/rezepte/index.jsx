import FilterModal from '@/components/filterRezepte/FilterModal';
import { getKategorien } from '@/lib/kategorien/kategorie';
import { getTags } from '@/lib/tags/tag';
import { getZutaten } from '@/lib/zutaten/zutat';
import { useState } from 'react';
import Button from 'react-bootstrap/Button'

export async function getServerSideProps() {
    const zutaten = await getZutaten()
    const kategorien = await getKategorien()
    const tags = await getTags()
    return { props: { dataZutaten: zutaten.data, dataKategorien: kategorien.data, dataTags: tags.data } }
}

export default function Home({ dataZutaten, dataKategorien, dataTags }) {
    const [filterShow, setFilterShow] = useState(false)
    
    const filterHandleShow = () => setFilterShow(true)
    const filterHandleClose = () => setFilterShow(false)

    return (
        <div className='container'>
            <Button variant='secondary' onClick={filterHandleShow}>Filter</Button>
            <FilterModal handleClose={filterHandleClose} show={filterShow} zutaten={dataZutaten} tags={dataTags} kategorien={dataKategorien}/>
        </div>
        
        
    );
}