import Link from "next/link";
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

const NavBarComp = () => {

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>Rezepte Webseite</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" href="/rezepte" passHref>
                            Rezepte Filtern
                        </Link>
                        <Link className="nav-link" href="/rezepte/create" passHref>
                            Rezept Erstellen
                        </Link>
                        <Link className="nav-link" href="/zutaten" passHref>
                            Zutaten
                        </Link>
                        <Link className="nav-link" href="/tags" passHref>
                            Tags
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBarComp
