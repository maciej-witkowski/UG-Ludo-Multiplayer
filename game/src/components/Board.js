import React from 'react'
import '../css/Board.css'

const Board = ({board}) => {

    const chooseColor = (pawnId) => {
        if (pawnId.startsWith('r')) {
            return 'red';
        } else if (pawnId.startsWith('b')) {
            return 'blue';
        } else if (pawnId.startsWith('g')) {
            return 'green';
        } else if (pawnId.startsWith('y')) {
            return 'yellow';
        }
    }

    return (
        <div id="container">
            <div id="row">
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className={"field "+board.board[23].job}>
                    {board.board[23].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[24].job}>
                    {board.board[24].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[25].job}>
                    {board.board[25].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
            </div>
            <div id="row">
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className={"field "+board.board[22].job}>
                    {board.board[22].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field green"}>
                    {board.pathToHouse.green[0].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[26].job}>
                    {board.board[26].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
            </div>
            <div id="row">
                <div className="field" />
                <div className="field" />
                <div className="field base">
                    {board.base.blue.some(e => e.id === "b1") ? (
                        <div className="pawn blue" />
                    ) : ""}
                </div>
                <div className="field blue" />
                <div className="field base">
                    {board.base.blue.some(e => e.id === "b2") ? (
                        <div className="pawn blue" />
                    ) : ""}
                </div>
                <div className="field" />
                <div className={"field "+board.board[21].job}>
                    {board.board[21].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field green"}>
                    {board.pathToHouse.green[1].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[27].job}>
                    {board.board[27].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className="field" />
                <div className="field base">
                    {board.base.green.some(e => e.id === "g1") ? (
                        <div className="pawn green" />
                    ) : ""}
                </div>
                <div className="field green" />
                <div className="field base">
                    {board.base.green.some(e => e.id === "g2") ? (
                        <div className="pawn green" />
                    ) : ""}
                </div>
                <div className="field" />
                <div className="field" />
            </div>
            <div id="row">
                <div className="field" />
                <div className="field" />
                <div className="field blue" />
                <div className="field blue" />
                <div className="field blue" />
                <div className="field" />
                <div className={"field "+board.board[20].job}>
                    {board.board[20].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field green"}>
                    {board.pathToHouse.green[2].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[28].job}>
                    {board.board[28].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className="field" />
                <div className="field green" />
                <div className="field green" />
                <div className="field green" />
                <div className="field" />
                <div className="field" />
            </div>
            <div id="row">
                <div className="field" />
                <div className="field" />
                <div className="field base">
                    {board.base.blue.some(e => e.id === "b3") ? (
                        <div className="pawn blue" />
                    ) : ""}
                </div>
                <div className="field blue" />
                <div className="field base">
                    {board.base.blue.some(e => e.id === "b4") ? (
                        <div className="pawn blue" />
                    ) : ""}
                </div>
                <div className="field" />
                <div className={"field "+board.board[19].job}>
                    {board.board[19].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field green"}>
                    {board.pathToHouse.green[3].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[29].job}>
                    {board.board[29].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className="field" />
                <div className="field base">
                    {board.base.green.some(e => e.id === "g3") ? (
                        <div className="pawn green" />
                    ) : ""}
                </div>
                <div className="field green" />
                <div className="field base">
                    {board.base.green.some(e => e.id === "g4") ? (
                        <div className="pawn green" />
                    ) : ""}
                </div>
                <div className="field" />
                <div className="field" />
            </div>
            <div id="row">
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className={"field "+board.board[18].job}>
                    {board.board[18].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field green"}>
                    {board.pathToHouse.green[4].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[30].job}>
                    {board.board[30].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
            </div>
            <div id="row">
                <div className={"field "+board.board[12].job}>
                    {board.board[12].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[13].job}>
                    {board.board[13].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[14].job}>
                    {board.board[14].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[15].job}>
                    {board.board[15].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[16].job}>
                    {board.board[16].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[17].job}>
                    {board.board[17].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className={"field "+board.board[31].job}>
                    {board.board[31].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[32].job}>
                    {board.board[32].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[33].job}>
                    {board.board[33].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[34].job}>
                    {board.board[34].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[35].job}>
                    {board.board[35].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[36].job}>
                    {board.board[36].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
            </div>
            <div id="row">
                <div className={"field "+board.board[11].job}>
                    {board.board[11].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className="field blue">
                    {board.pathToHouse.blue[0].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className="field blue">
                    {board.pathToHouse.blue[1].onField.map(pawn => (
                        <div className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className="field blue">
                    {board.pathToHouse.blue[2].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className="field blue">
                    {board.pathToHouse.blue[3].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className="field blue">
                    {board.pathToHouse.blue[4].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>

                <div className="field" />
                <div className="field" />
                <div className="field" />

                <div className="field yellow">
                    {board.pathToHouse.yellow[4].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className="field yellow">
                    {board.pathToHouse.yellow[3].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className="field yellow">
                    {board.pathToHouse.yellow[2].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className="field yellow">
                    {board.pathToHouse.yellow[1].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className="field yellow">
                    {board.pathToHouse.yellow[0].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[37].job}>
                    {board.board[37].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
            </div>
            <div id="row">
                <div className={"field "+board.board[10].job}>
                    {board.board[10].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[9].job}>
                    {board.board[9].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[8].job}>
                    {board.board[8].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[7].job}>
                    {board.board[7].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[6].job}>
                    {board.board[6].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[5].job}>
                    {board.board[5].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className={"field "+board.board[43].job}>
                    {board.board[43].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[42].job}>
                    {board.board[42].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[41].job}>
                    {board.board[41].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[40].job}>
                    {board.board[40].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[39].job}>
                    {board.board[39].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[38].job}>
                    {board.board[38].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
            </div>
            <div id="row">
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className={"field "+board.board[4].job}>
                    {board.board[4].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field red"}>
                    {board.pathToHouse.red[4].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[44].job}>
                    {board.board[44].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
            </div>
            <div id="row">
                <div className="field" />
                <div className="field" />
                <div className="field base">
                    {board.base.red.some(e => e.id === "r1") ? (
                        <div className="pawn red" />
                    ) : ""}
                </div>
                <div className="field red">
                </div>
                <div className="field base">
                    {board.base.red.some(e => e.id === "r2") ? (
                        <div className="pawn red" />
                    ) : ""}
                </div>
                <div className="field" />
                <div className={"field "+board.board[3].job}>
                    {board.board[3].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field red"}>
                    {board.pathToHouse.red[3].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[45].job}>
                    {board.board[45].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className="field" />
                <div className="field base">
                    {board.base.yellow.some(e => e.id === "y1") ? (
                        <div className="pawn yellow" />
                    ) : ""}
                </div>
                <div className="field yellow" />
                <div className="field base">
                    {board.base.yellow.some(e => e.id === "y2") ? (
                        <div className="pawn yellow" />
                    ) : ""}
                </div>
                <div className="field" />
                <div className="field" />
            </div>
            <div id="row">
                <div className="field" />
                <div className="field" />
                <div className="field red" />
                <div className="field red" />
                <div className="field red" />
                <div className="field" />
                <div className={"field "+board.board[2].job}>
                    {board.board[2].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field red"}>
                    {board.pathToHouse.red[2].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[46].job}>
                    {board.board[46].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className="field" />
                <div className="field yellow" />
                <div className="field yellow" />
                <div className="field yellow" />
                <div className="field" />
                <div className="field" />
            </div>
            <div id="row">
                <div className="field" />
                <div className="field" />
                <div className="field base">
                    {board.base.red.some(e => e.id === "r3") ? (
                        <div className="pawn red" />
                    ) : ""}
                </div>
                <div className="field red" />
                <div className="field base">
                    {board.base.red.some(e => e.id === "r4") ? (
                        <div className="pawn red" />
                    ) : ""}
                </div>
                <div className="field" />
                <div className={"field "+board.board[1].job}>
                    {board.board[1].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field red"}>
                    {board.pathToHouse.red[1].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[47].job}>
                    {board.board[47].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className="field" />
                <div className="field base">
                    {board.base.yellow.some(e => e.id === "y3") ? (
                        <div className="pawn yellow" />
                    ) : ""}
                </div>
                <div className="field yellow" />
                <div className="field base">
                    {board.base.yellow.some(e => e.id === "y4") ? (
                        <div className="pawn yellow" />
                    ) : ""}
                </div>
                <div className="field" />
                <div className="field" />
            </div>
            <div id="row">
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className={"field "+board.board[0].job}>
                    {board.board[0].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field red"}>
                    {board.pathToHouse.red[0].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[48].job}>
                    {board.board[48].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
            </div>
            <div id="row">
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className={"field "+board.board[51].job}>
                    {board.board[51].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[50].job}>
                    {board.board[50].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className={"field "+board.board[49].job}>
                    {board.board[49].onField.map(pawn => (
                        <div key={pawn.id} className={"pawn "+chooseColor(pawn.id)}>{pawn.id}</div>
                    ))}
                </div>
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
                <div className="field" />
            </div>
        </div>
    )
}

export default Board;