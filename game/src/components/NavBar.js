import React from "react";
import {Button, Nav, Navbar, NavbarBrand, NavLink} from "reactstrap";
import gamesOperations from "../state/games/operations";
import {connect} from "react-redux";

const NavBar = ({addGame}) => {

    return (
        <div>
            <Navbar color="dark" dark className="justify-content-between">
                <NavbarBrand href="/">
                    Chińczyk - gra planszowa
                </NavbarBrand>
                <Nav className="mr-auto">
                    <NavLink href="/games">Wszystkie sesje</NavLink>
                </Nav>
                <Nav className="flex-row">
                    <Button color="secondary" onClick={() => {
                        addGame()
                    }}>Stwórz sesje</Button>
                </Nav>
            </Navbar>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        addGame: () => {
            dispatch(gamesOperations.addGame());
        },
    }
}

export default connect(null, mapDispatchToProps)(NavBar);