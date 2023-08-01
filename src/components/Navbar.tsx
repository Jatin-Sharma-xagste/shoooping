import {Button, Container,Nav, Navbar as NavbarBs} from "react-bootstrap"
import {NavLink} from "react-router-dom"
import { useShoppingCart } from "../context/ShoppingCartContext"
export function Navbar(){

    const { openCart , cartQuantity }= useShoppingCart()
    return (
    <NavbarBs  sticky="top" className="bg-white shadow-sm mb-3">
        <Container>
            <Nav className="me-auto">
                <Nav.Link to="/Home" as={NavLink}>Home </Nav.Link>
                <Nav.Link to="/Store" as={NavLink}>Store</Nav.Link>
                <Nav.Link to="/About" as={NavLink}>About </Nav.Link>
           
            </Nav>
            {cartQuantity > 0 && (
            <Button onClick={openCart}>
                
            {cartQuantity}

            </Button>
            )}
            </Container>
        </NavbarBs>
        )
}