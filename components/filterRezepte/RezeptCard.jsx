import Card from 'react-bootstrap/Card'
import Link from 'next/link'
import StarCompBasic from './StarCompBasic'

const RezeptCard = ({ rezept }) => {
    console.log(rezept)
    return (
        <Card className='my-1'>
            <Card.Body>
                <Card.Title>{rezept.name}</Card.Title>
                <StarCompBasic stars={rezept.rating} />
                <Link href={`/rezepte/${rezept.id}`} key={rezept.name}>Rezept Anschauen</Link>
            </Card.Body>
        </Card>
    )
}

export default RezeptCard