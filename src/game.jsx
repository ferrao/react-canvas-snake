import React, {PureComponent} from 'react';
import Board from './board';
import Segment from './segment';

const COLS=20;
const ROWS=20;
const SPEED=10;

class Game extends PureComponent {

    state = {
        row: 0,
        col: 0,
        rafCounter: SPEED
    }

    update = () => {
        if (!this.rafCounter) {
            this.rafCounter = SPEED; 
            this.move();
        } else {
            --this.rafCounter;
        }

        requestAnimationFrame(this.update);

    }

    move = () => {
        this.setState(prevState => ({
            row: prevState.row + 1,
            col: prevState.col + 1
        }));
    }

    componentDidMount() {
        requestAnimationFrame(this.update);
    }

    render() {
        const { row, col } = this.state;
        return (
            <Board cols={COLS} rows={ROWS}>
                <Segment row={row} col={col}/>
            </Board>
        );
    } 
}

export default Game;
