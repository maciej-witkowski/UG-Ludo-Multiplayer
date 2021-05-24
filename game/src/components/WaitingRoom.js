import React, {useEffect} from 'react'
import {connect} from "react-redux";
import gamesOperations from "../state/games/operations";
import {Button, Col, Container, Row, Table} from "reactstrap";
import {Link} from "react-router-dom";

const WaitingRoom = ({games, fetchGames}) => {

    useEffect(() => {
        const interval = setInterval(() => {
            fetchGames();
        }, 1000);
        return () => clearInterval(interval);
    }, [fetchGames]);

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col>
                        <Table>
                            <thead>
                            <tr>
                                <th>Lp.</th>
                                <th>ID</th>
                                <th>Gracze</th>
                                <th>Status</th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {games.map(game => (
                                <tr key={game.id}>
                                    <th scope="row">{games.indexOf(game)}</th>
                                    <td>{game.id}</td>
                                    <td>{game.players.length} / 4</td>
                                    <td>{game.status}</td>
                                    <td>
                                        {!game.status.startsWith("Game over") && game.slots.length !== 0 ? (
                                            <Button color="primary" size="sm">
                                                <Link to={`/game/${game.id}`} style={{ color: 'white' }}>Dołącz</Link>
                                            </Button>
                                        ) : (
                                            <Button color="secondary" size="sm" disabled>
                                                Dołącz
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

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


export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom);