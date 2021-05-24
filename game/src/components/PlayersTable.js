import React from 'react'
import {Table} from "reactstrap";

const PlayersTable = ({players}) => {

    return(
        <Table size="sm">
            <thead>
            <tr>
                <th>Lp.</th>
                <th>Kolor</th>
                <th>Nick</th>
            </tr>
            </thead>
            <tbody>
            {players.map(player => (
                <tr key={player.id}>
                    <th scope="row">{players.indexOf(player)}</th>
                    <td>{player.color}</td>
                    <td>{player.nick}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    )
};

export default PlayersTable;