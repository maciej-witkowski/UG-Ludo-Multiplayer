const express = require('express');
const app = express();
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const e = require('express');
require('dotenv').config();

app.use(express.json());
app.use(cors());

let games = [];

class Session {
    constructor(id) {
        this.id = id;
        this.players = [];
        this.slots = ["yellow", "green", "blue", "red"];
        this.board = new Board();
        this.turn = "red";
        this.status = "Waiting for players...";
        this.winner = null;
    }
    getPlayer(nick) {
        if (this.isPlayer(nick)) return this.players.find(player => player.nick === nick);
    }
    isPlayer(nick) {
        const player = this.players.find(player => player.nick === nick);

        if (player) return true;
        else return false;
    }
    addPlayer(nick) {
        this.players.push(new Player(uuidv4(), nick, this.slots[this.slots.length - 1]));
        this.slots.pop();
    }
    removePlayer(nick) {
        const user = this.getPlayer(nick);
        this.players = this.players.filter(player => player !== user);
        this.slots.push(user.color);
    }
    setStatusToEnded(winner) {
        this.status = `Game over, ${winner} team won!`;
        this.winner = winner;
    }
    setTurn(color) {
        const player = this.players.find(e => e.color === color);
        const index = this.players.indexOf(player);

        if (index === this.players.length - 1) {
            this.turn = this.players[0].color;
        } else {
            this.turn = this.players[index + 1].color;
        }

        if (this.turn !== "red") this.status = "On going...";
    }
}

class Player {
    constructor(id, nick, color) {
        this.id = id;
        this.nick = nick;
        this.color = color;
    }
}

class Board {
    constructor() {
        this.board = [
            new Field("redStart", 1),
            new Field("empty", 2),
            new Field("empty", 3),
            new Field("empty", 4),
            new Field("empty", 5),
            new Field("empty", 6),
            new Field("empty", 7),
            new Field("empty", 8),
            new Field("safe", 9),
            new Field("empty", 10),
            new Field("empty", 11),
            new Field("empty", 12),
            new Field("blueBreakpoint", 13),
            new Field("blueStart", 14),
            new Field("empty", 15),
            new Field("empty", 16),
            new Field("empty", 17),
            new Field("empty", 18),
            new Field("empty", 19),
            new Field("empty", 20),
            new Field("empty", 21),
            new Field("safe", 22),
            new Field("empty", 23),
            new Field("empty", 24),
            new Field("empty", 25),
            new Field("greenBreakpoint", 26),
            new Field("greenStart", 27),
            new Field("empty", 28),
            new Field("empty", 29),
            new Field("empty", 30),
            new Field("empty", 31),
            new Field("empty", 32),
            new Field("empty", 33),
            new Field("empty", 34),
            new Field("safe", 35),
            new Field("empty", 36),
            new Field("empty", 37),
            new Field("empty", 38),
            new Field("yellowBreakpoint", 39),
            new Field("yellowStart", 40),
            new Field("empty", 41),
            new Field("empty", 42),
            new Field("empty", 43),
            new Field("empty", 44),
            new Field("empty", 45),
            new Field("empty", 46),
            new Field("empty", 47),
            new Field("safe", 48),
            new Field("empty", 49),
            new Field("empty", 50),
            new Field("empty", 51),
            new Field("redBreakpoint", 52)
        ];
        this.house = {
            red: [],
            blue: [],
            green: [],
            yellow: [],
        };
        this.pathToHouse = {
            red: [new Field("house", 101), new Field("house", 102), new Field("house", 103), new Field("house", 104), new Field("house", 105)],
            blue: [new Field("house", 201), new Field("house", 202), new Field("house", 203), new Field("house", 204), new Field("house", 205)],
            green: [new Field("house", 301), new Field("house", 302), new Field("house", 303), new Field("house", 304), new Field("house", 305)],
            yellow: [new Field("house", 401), new Field("house", 402), new Field("house", 403), new Field("house", 404), new Field("house", 405)],
        };
        this.base = {
            red: [new Pawn("r1"), new Pawn("r2"), new Pawn("r3"), new Pawn("r4")],
            blue: [new Pawn("b1"), new Pawn("b2"), new Pawn("b3"), new Pawn("b4")],
            green: [new Pawn("g1"), new Pawn("g2"), new Pawn("g3"), new Pawn("g4")],
            yellow: [new Pawn("y1"), new Pawn("y2"), new Pawn("y3"), new Pawn("y4")],
        };
    };
    getPawn(pawnId) {
        const fieldBoard = this.board.find(field => field.onField.some(pawn => pawn.id === pawnId));
        const pawnBase = Object.values(this.base).flat().find(pawn => pawn.id === pawnId);
        const pawnPathToHouse = Object.values(this.pathToHouse).flat().map(field => field.onField).flat().find(pawn => pawn.id === pawnId);
        const pawnHouse = Object.values(this.house).flat().find(pawn => pawn.id === pawnId);


        if (pawnBase) return pawnBase;
        else if (pawnPathToHouse) return pawnPathToHouse;
        else if (pawnHouse) return pawnHouse;
        else return fieldBoard.onField.find(pawn => pawn.id === pawnId);
    }
    inBase(pawn) {
        if (pawn.position === "base") return true;
        else return false;
    };
    inHouse(pawn) {
        if (pawn.position > 100) return true;
        else return false;
    }
    putPawnOnField(pawn) {
        if (pawn.id.startsWith('r')) {
            const field = this.board.find(e => e.job === "redStart");
            field.onField.push(pawn);
            this.base.red = this.base.red.filter(e => e !== pawn);
            pawn.position = field.id;
        } else if (pawn.id.startsWith('b')) {
            const field = this.board.find(e => e.job === "blueStart");
            field.onField.push(pawn);
            this.base.blue = this.base.blue.filter(e => e !== pawn);
            pawn.position = field.id;
        } else if (pawn.id.startsWith('g')) {
            const field = this.board.find(e => e.job === "greenStart");
            field.onField.push(pawn);
            this.base.green = this.base.green.filter(e => e !== pawn);
            pawn.position = field.id;
        } else if (pawn.id.startsWith('y')) {
            const field = this.board.find(e => e.job === "yellowStart");
            field.onField.push(pawn);
            this.base.yellow = this.base.yellow.filter(e => e !== pawn);
            pawn.position = field.id;
        }
    };
    enterOnPathToHouse(pawn, distance) {
        if (pawn.id.startsWith('r')) {
            const destination = distance - (51 - pawn.position) + 100;
            const currField = this.board.find(e => e.id === pawn.position);
            const nextField = this.pathToHouse.red.find(e => e.id === destination);

            if (destination === 106) {
                this.house.red.push(pawn);
                pawn.position = "house";
            } else {
                nextField.onField.push(pawn);
                pawn.position = nextField.id;
            }

            const index = currField.onField.indexOf(pawn);
            currField.onField.splice(index, 1);
        } else if (pawn.id.startsWith('b')) {
            const destination = distance - (12 - pawn.position) + 200;
            const currField = this.board.find(e => e.id === pawn.position);
            const nextField = this.pathToHouse.blue.find(e => e.id === destination);

            if (destination === 206) {
                this.house.blue.push(pawn);
                pawn.position = "house";
            } else {
                nextField.onField.push(pawn);
                pawn.position = nextField.id;
            }

            const index = currField.onField.indexOf(pawn);
            currField.onField.splice(index, 1);
        } else if (pawn.id.startsWith('g')) {
            const destination = distance - (25 - pawn.position) + 300;
            const currField = this.board.find(e => e.id === pawn.position);
            const nextField = this.pathToHouse.green.find(e => e.id === destination);

            if (destination === 306) {
                this.house.green.push(pawn);
                pawn.position = "house";
            } else {
                nextField.onField.push(pawn);
                pawn.position = nextField.id;
            }

            const index = currField.onField.indexOf(pawn);
            currField.onField.splice(index, 1);
        } else if (pawn.id.startsWith('y')) {
            const destination = distance - (38 - pawn.position) + 400;
            const currField = this.board.find(e => e.id === pawn.position);
            const nextField = this.pathToHouse.yellow.find(e => e.id === destination);

            if (destination === 406) {
                this.house.yellow.push(pawn);
                pawn.position = "house";
            } else {
                nextField.onField.push(pawn);
                pawn.position = nextField.id;
            }

            const index = currField.onField.indexOf(pawn);
            currField.onField.splice(index, 1);
        }
    }
    canMove(pawn, distance) {
        if (pawn.position === "base") {
            if (distance === 6) return true;
            else return false;
        } else if (pawn.position === "house") {
            return false;
        } else if ((pawn.id.startsWith('r') && pawn.position + distance > 106) ||
            (pawn.id.startsWith('b') && pawn.position + distance > 206) ||
            (pawn.id.startsWith('g') && pawn.position + distance > 306) ||
            (pawn.id.startsWith('y') && pawn.position + distance > 406)) {
            return false;
        } else return true;
    }
    checkIfReachedBreakpoint(pawn, distance) {
        const destination = pawn.position + distance;

        const start = pawn.position;
        let end = pawn.position + distance;
        let chunk = [];

        if (destination > 52) {
            end = distance - (52 - pawn.position);
            chunk = chunk.concat(
                this.board.slice(start, 52),
                this.board.slice(0, end)
            );
        } else chunk = this.board.slice(start, end);

        console.log(chunk);

        if (pawn.id.startsWith('r')) {
            if (chunk.some(field => field.job === "redBreakpoint")) return true
            else return false;
        } else if (pawn.id.startsWith('b')) {
            if (chunk.some(field => field.job === "blueBreakpoint")) return true
            else return false;
        } else if (pawn.id.startsWith('g')) {
            if (chunk.some(field => field.job === "greenBreakpoint")) return true
            else return false;
        } else if (pawn.id.startsWith('y')) {
            if (chunk.some(field => field.job === "yellowBreakpoint")) return true
            else return false;
        }
    }
    makeMove(pawn, distance) {
        const destination = pawn.position + distance;

        const currField = this.board.find(e => e.id === pawn.position);
        let nextField = {};

        if (destination > 52) nextField = this.board.find(e => e.id === distance - (52 - pawn.position));
        else nextField = this.board.find(e => e.id === destination)

        if (["empty", "redBreakpoint", "blueBreakpoint", "greenBreakpoint", "yellowBreakpoint"].includes(nextField.job)) {
            const pawns = nextField.onField;
            pawns.forEach(e => {
                if (!e.id.startsWith(pawn.id[0])) {
                    if (e.id.startsWith('r')) {
                        e.position = "base";
                        this.base.red.push(e);
                    } else if (e.id.startsWith('b')) {
                        e.position = "base";
                        this.base.blue.push(e);
                    } else if (e.id.startsWith('g')) {
                        e.position = "base";
                        this.base.green.push(e);
                    } else if (e.id.startsWith('y')) {
                        e.position = "base";
                        this.base.yellow.push(e);
                    }
                    const index = nextField.onField.indexOf(e);
                    nextField.onField.splice(index, 1);
                }
            })
        }

        nextField.onField.push(pawn);
        pawn.position = nextField.id;

        const index = currField.onField.indexOf(pawn);
        currField.onField.splice(index, 1);
    }
    makeMoveInHouse(pawn, distance) {
        if (pawn.id.startsWith('r')) {
            const destination = pawn.position + distance;
            const currField = this.pathToHouse.red.find(e => e.id === pawn.position);
            const nextField = this.pathToHouse.red.find(e => e.id === destination);

            if (destination === 106) {
                this.house.red.push(pawn);
                pawn.position = "house";
            } else {
                nextField.onField.push(pawn);
                pawn.position = nextField.id;
            }

            const index = currField.onField.indexOf(pawn);
            currField.onField.splice(index, 1);
        } else if (pawn.id.startsWith('b')) {
            const destination = pawn.position + distance;
            const currField = this.pathToHouse.blue.find(e => e.id === pawn.position);
            const nextField = this.pathToHouse.blue.find(e => e.id === destination);

            if (destination === 206) {
                this.house.blue.push(pawn);
                pawn.position = "house";
            } else {
                nextField.onField.push(pawn);
                pawn.position = nextField.id;
            }

            const index = currField.onField.indexOf(pawn);
            currField.onField.splice(index, 1);
        } else if (pawn.id.startsWith('g')) {
            const destination = pawn.position + distance;
            const currField = this.pathToHouse.green.find(e => e.id === pawn.position);
            const nextField = this.pathToHouse.green.find(e => e.id === destination);

            if (destination === 306) {
                this.house.green.push(pawn);
                pawn.position = "house";
            } else {
                nextField.onField.push(pawn);
                pawn.position = nextField.id;
            }

            const index = currField.onField.indexOf(pawn);
            currField.onField.splice(index, 1);
        } else if (pawn.id.startsWith('y')) {
            const destination = pawn.position + distance;
            const currField = this.pathToHouse.yellow.find(e => e.id === pawn.position);
            const nextField = this.pathToHouse.yellow.find(e => e.id === destination);

            if (destination === 406) {
                this.house.yellow.push(pawn);
                pawn.position = "house";
            } else {
                nextField.onField.push(pawn);
                pawn.position = nextField.id;
            }

            const index = currField.onField.indexOf(pawn);
            currField.onField.splice(index, 1);
        }
    }
    checkForWin() {
        const results = Object.entries(this.house).map(e => [e[0], e[1].length]);
        return results.find(e => e[1] === 4);
    }
}

class Pawn {
    constructor(id) {
        this.id = id;
        this.position = "base";
    }
}

class Field {
    constructor(job, id) {
        this.job = job;
        this.id = id;
        this.onField = [];
    }
}

app.get('/games', (req, res) => {
    try {
        res.send(games);
    } catch (error) {
        res.send({ error: error.message });
    }
});

app.get('/newGame', (req, res) => {
    try {
        const gameId = uuidv4()
        const newGame = new Session(gameId);
        games.push(newGame);
        res.send(newGame);
    } catch (error) {
        res.send({ error: error.message });
    }
});

app.post('/game/:id/join', (req, res) => {
    try {
        const gameId = req.params.id;
        const nick = req.body.nick;
        const game = games.find(game => game.id === gameId);

        if (!game) res.send({ msg: "Game not found!", success: false });
        else if (!game.slots.length) res.send({ msg: "The session is full!", success: false });
        else if (game.players.some(player => player.nick === nick)) res.send({ msg: "Player with that nick already exists!", success: false });
        else {
            game.addPlayer(nick);
            const player = game.players.find(e => e.nick === nick);
            res.send(player);
        }
    } catch (error) {
        res.send({ error: error.message });
    }
});

app.post('/game/:id/leave', (req, res) => {
    try {
        const gameId = req.params.id;
        const nick = req.body.nick;
        const game = games.find(game => game.id === gameId);

        if (!game) res.send({ msg: "Game not found!", success: false });
        else if (!game.isPlayer(nick)) res.send({ msg: "Player with that nick does not exists!", success: false });
        else {
            game.removePlayer(nick);
            res.send({ msg: "Player has been removed!", success: true });
        }
    } catch (error) {
        res.send({ error: error.message });
    }
});

app.post('/game/:id/move', (req, res) => {
    try {
        const gameId = req.params.id;
        const color = req.body.color;
        const pawnId = req.body.pawnId;
        const distance = parseInt(req.body.distance);

        const game = games.find(game => game.id === gameId);
        const pawn = game.board.getPawn(pawnId);

        if (!game) res.send({ msg: "Game not found!", success: false });
        else if (game.board.canMove(pawn, distance)) {

            if (game.board.inBase(pawn)) {
                game.board.putPawnOnField(pawn);

                if (distance !== 6) game.setTurn(color);

                res.send({ msg: "The move was made", success: true });
            }
            else if (game.board.inHouse(pawn)) {
                game.board.makeMoveInHouse(pawn, distance);

                if (distance !== 6) game.setTurn(color);

                const winner = game.board.checkForWin();

                if (winner) {
                    game.setStatusToEnded(winner[0]);
                    res.send({ msg: "Game over!", success: true });
                } else res.send({ msg: "The move was made", success: true });
            }
            else {
                if (game.board.checkIfReachedBreakpoint(pawn, distance)) game.board.enterOnPathToHouse(pawn, distance);
                else game.board.makeMove(pawn, distance);

                if (distance !== 6) game.setTurn(color);

                const winner = game.board.checkForWin();

                if (winner) {
                    game.setStatusToEnded(winner[0]);
                    res.send({ msg: "Game over!", success: true });
                } else res.send({ msg: "The move was made", success: true });
            }
        } else {
            if (distance !== 6) game.setTurn(color);

            const winner = game.board.checkForWin();

            if (winner) {
                game.setStatusToEnded(winner[0]);
                res.send({ msg: "Game over!", success: true });
            } else res.send({ msg: "You lose your turn", success: false });
        }
    } catch (error) {
        res.send({ error: error.message });
    }
});

app.get('/game/:id', (req, res) => {
    try {
        const gameId = req.params.id;
        const game = games.find(game => game.id === gameId);

        if (!game) res.send({ msg: "Game not found!", success: false })
        else res.send(game);
    } catch (error) {
        res.send({ error: error.message });
    }
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`API server listening at http://localhost:${port}`);
});
