/* eslint-disable */
import React, { PureComponent } from 'react';

import Board from './board';
import Snake from './snake';

const COLS = 20;
const ROWS = 20;

class Game extends PureComponent {
    render() {
        return (
            <Board cols={COLS} rows={ROWS}>
                <Snake row={ROWS / 2} col={COLS / 2} delay={10} />
            </Board>
        );
    }
}

export default Game;
