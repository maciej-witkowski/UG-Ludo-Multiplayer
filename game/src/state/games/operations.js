import {createAction} from 'redux-api-middleware';
import {
    ADD_FAILURE,
    ADD_REQUEST,
    ADD_SUCCESS,
    GAMES_FAILURE,
    GAMES_REQUEST,
    GAMES_SUCCESS,
    JOIN_FAILURE,
    JOIN_REQUEST,
    JOIN_SUCCESS
} from "./types";

const getGames = () => dispatch => {
    dispatch(createAction({
        endpoint: 'http://192.168.0.80:5000/games',
        method: 'GET',
        headers: {
            "Accept": "application/json",
        },
        types: [
            GAMES_REQUEST,
            GAMES_SUCCESS,
            GAMES_FAILURE]
    }));
};

const addGame = () => dispatch => {
    dispatch(createAction({
        endpoint: 'http://192.168.0.80:5000/newGame',
        method: 'GET',
        headers: {
            "Accept": "application/json",
        },
        types: [
            ADD_REQUEST,
            ADD_SUCCESS,
            ADD_FAILURE]
    }));
};

const joinToGame = (gameId, nick) => dispatch => {
    dispatch(createAction({
        endpoint: `http://192.168.0.80:5000/game/${gameId}/join`,
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nick),
        types: [
            JOIN_REQUEST,
            JOIN_SUCCESS,
            JOIN_FAILURE]
    }));
};

const gamesOperations = {
    getGames,
    addGame,
    joinToGame
}

export default gamesOperations
