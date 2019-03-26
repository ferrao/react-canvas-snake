import React, { Fragment, PureComponent } from 'react';
import Board from './board';
import Snake from './snake';
import KeyHandler, { key } from './keyhandler';
import direction from './direction';

const COLS = 20;
const ROWS = 20;

class Game extends PureComponent {
    state = {
        direction: direction.DOWN
    };

    setDirection(direction) {
        this.setState({ direction });
    }

    render() {
        return (
            <Fragment>
                <KeyHandler keyValue={key.UP} onKey={() => this.setDirection(direction.UP)} />
                <KeyHandler keyValue={key.RIGHT} onKey={() => this.setDirection(direction.RIGHT)} />
                <KeyHandler keyValue={key.DOWN} onKey={() => this.setDirection(direction.DOWN)} />
                <KeyHandler keyValue={key.LEFT} onKey={() => this.setDirection(direction.LEFT)} />

                <Board cols={COLS} rows={ROWS}>
                    <Snake
                        startRow={ROWS / 2}
                        startCol={COLS / 2}
                        delay={10}
                        direction={this.state.direction}
                    />
                </Board>
            </Fragment>
        );
    }
}

export default Game;
