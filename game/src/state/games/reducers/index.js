import {
    ADD_SUCCESS,
    GAMES_SUCCESS
} from "../types";

const games = (state = [], action) => {
    switch (action.type) {
        case GAMES_SUCCESS:
            return [...action.payload]
        case ADD_SUCCESS:
            return [...state, action.payload]
        default:
            return state;
    }
};

const gamesReducers = {
    games
}

export default gamesReducers;
