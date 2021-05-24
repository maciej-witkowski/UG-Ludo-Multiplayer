import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import gamesOperations from "../state/games/operations";
import {connect} from "react-redux";
import {
    Button,
    ButtonGroup,
    Card, CardBody,
    CardText,
    Col,
    Container,
    Jumbotron,
    Row,
    Spinner,
    Table
} from "reactstrap";
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import Board from "./Board";
import PlayersTable from "./PlayersTable";

const mqtt = require('mqtt');

const Session = () => {

    let { id } = useParams();

    const [game, setGame] = useState(null);

    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState('');

    const [client, setClient] = useState(null);
    const [player, setPlayer] = useState({});

    const [dice, setDice] = useState(0);
    const [rollCount, setRollCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get(`http://192.168.0.80:5000/game/${id}`)
                .then(response => {
                    setGame(response.data);
                })
                .catch(error => console.log(error));
        }, 1000);
        return () => clearInterval(interval);
    }, [id]);

    useEffect(() => {
        mqttConnect('ws://10.45.3.41:8000/mqtt');
    }, []);

    useEffect(() => {
        if (client) {
            client.on('connect', () => {
                client.subscribe(`/chat/${id}`);
            });
            client.on('message', (topic, message) => {
                if (topic.toString() === `/chat/${id}`) {
                    setChat([message.toString(), ...chat]);
                }
            })
        }
    })

    const mqttConnect = broker => {
        setClient(mqtt.connect(broker));
    };

    const validate = (values) => {
        const errors = {};

        const nicknames = game.players.map(e => e.nick);

        if (values.nick.length === 0) {
            errors.nick = "Pole nie może być puste!"
        }
        else if (nicknames.includes(values.nick)) {
            errors.nick = "Gracz o podanej nazwie już istnieje!"
        }

        return errors;
    };

    const rollDice = () => {
        const values = [1, 2, 3, 4, 5, 6, 6, 6]
        const index = Math.floor(Math.random() * values.length);
        setDice(values[index]);
        setRollCount(rollCount + 1);
    }

    const makeMove = (num) => {
        if (dice !== 0) {
            axios.post(`http://192.168.0.80:5000/game/${id}/move`, {
                color: player.color,
                pawnId: player.color[0]+num.toString(),
                distance: dice
            })
                .then(response => console.log(response))
                .catch(error => console.log(error));
        }
        setDice(0);
        setRollCount(0);
    }

    const handleMessage = (event) => {
        setMessage(event.target.value);
    };

    const sendMessage = (event, message) => {
        event.preventDefault();
        client.publish(`/chat/${id}`, player.nick + ": " + message );
    };

    const setMessageColor = (msg) => {
        const [nick, message] = msg.split(': ');
        const founded = game.players.find(player => player.nick === nick);
        return founded.color;
    }

    return (
        <div>
            {Object.keys(player).length === 0 ? (
                <Formik
                    initialValues={{ nick: ""}}
                    validate={(values => validate(values))}
                    onSubmit={async (values) => {
                        axios.post(`http://192.168.0.80:5000/game/${id}/join`, values)
                            .then(response => setPlayer(response.data))
                            .catch(error => console.log(error));
                    }}
                >
                    {() => (
                        <Form>
                            <div>
                                <label>Podaj nazwę:</label>
                                <Field
                                    name="nick"
                                    type="text"
                                />
                                <ErrorMessage
                                    name={'nick'}
                                    component="div"
                                />
                            </div>
                            <Button type="submit" variant="contained" color="primary">
                                Dodaj
                            </Button>
                        </Form>
                    )}
                </Formik>
            ) : game.winner ? (
                <Jumbotron>
                    <h1>Koniec gry!</h1>
                    <p>
                        Wygrała drużyna <strong>{game.winner}</strong>
                    </p>
                    <Button color="primary" href="/games">
                        Wróć do aktywnych sesji
                    </Button>
                </Jumbotron>
            ) : game ? (
                <Container fluid>
                    <Row>
                        <Col xs={12} lg={8} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Board board={game.board} />
                        </Col>
                        <Col xs={12} lg={4}>
                            <Container>
                                <Row>
                                    <Col style={{ marginTop: "10px" }}>
                                        <PlayersTable players={game.players} />
                                    </Col>
                                </Row>
                                {game.turn === player.color ? (
                                    <Row style={{ height: "185px" }}>
                                        <Col>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th>KOSTKA</th>
                                                        <th>PIONKI</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{dice}</td>
                                                        <td>
                                                            <ButtonGroup>
                                                                <Button onClick={() => makeMove(1)}>1</Button>
                                                                <Button onClick={() => makeMove(2)}>2</Button>
                                                                <Button onClick={() => makeMove(3)}>3</Button>
                                                                <Button onClick={() => makeMove(4)}>4</Button>
                                                            </ButtonGroup>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            {rollCount === 0 ? (
                                                                <Button color="primary" size="sm" onClick={() => rollDice()}>LOSUJ</Button>
                                                            ) : (
                                                                <Button color="primary" size="sm" disabled>LOSUJ</Button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                ) : (
                                    <Row style={{ height: "185px" }}>
                                        <Col>
                                            <Card body>
                                                <CardBody style={{ display: "flex", justifyContent: "center" }}>
                                                    <Spinner color="primary" className="mr-5"/>
                                                    <CardText tag="h4">Tura gracza => {game.turn}</CardText>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                )}
                                <Row>
                                    <Col>
                                        <h3 style={{ marginBottom: "10px"}}>Chat prywatny</h3>
                                        <Card body>
                                            <CardBody style={{ backgroundColor: "#3b424f", borderRadius: "5px" }}>
                                                <div style={{ height: "30vh", overflowY: "scroll", display: "flex", flexDirection: "column-reverse"}}>
                                                    {chat && chat.map((message, id) => (
                                                        <div key={id} style={{ background: "None", display: "flex", justifyContent: "flex-start", padding: "0 8px", flexWrap: "wrap", textAlign: "start" }}>
                                                            <p style={{ color: setMessageColor(message), padding: "5px", textShadow: "1px 1px black", margin: "0", fontSize: "1.5em" }}>
                                                                {message}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                                <form id="form" onSubmit={(event) => {
                                                    sendMessage(event, message);
                                                    document.getElementById("form").reset();
                                                }} style={{ width: "100%", display: "flex" }}>
                                                    <input
                                                        type='text'
                                                        onChange={(event) => handleMessage(event)}
                                                        placeholder='Napisz wiadomość...'
                                                        style={{ flexGrow: "1", width: "10px" }}
                                                    />
                                                    <button type="submit">Wyślij</button>
                                                </form>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            ) : ""}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        games: state.games,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGames: () => {
            dispatch(gamesOperations.getGames());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Session);