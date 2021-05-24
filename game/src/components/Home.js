import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Jumbotron} from "reactstrap";

const Home = () => {
    return (
        <div>
            <Jumbotron>
                <h1>Witaj w chińczyku, XIX-wiecznej grze planszowej!</h1>
                <p>
                    Ta strona pozwoli ci zagrać razem z Twoimi znajomymi w jedną z najbardziej popularnych gier planszowych - chińczyka.
                    Twórz specjalne pokoje dedykowane dla Ciebie i Twoich przeciwników, a następnie spotkajcie się na planszy - niech wygra najlepszy!
                </p>
                <Button color="primary" href="/games">
                    Wszystkie sesje
                </Button>
            </Jumbotron>
        </div>
    )
};

export default Home;
