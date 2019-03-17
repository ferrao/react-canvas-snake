import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Segment from './segment';

const direction = {
    UP: {
        deltaRow: -1,
        deltaCol: 0
    },
    RIGHT: {
        deltaRow: 0,
        deltaCol: 1
    },
    DOWN: {
        deltaRow: 1,
        deltaCol: 0
    },
    LEFT: {
        deltaRow: 0,
        deltaCol: -1
    }
};

class Snake extends PureComponent {
    static propTypes = {
        delay: PropTypes.number,
        paint: PropTypes.func,
        clear: PropTypes.func,

        row: PropTypes.number.isRequired,
        col: PropTypes.number.isRequired
    };

    static defaultProps = {
        delay: 0,
        paint: () => {},
        clear: () => {}
    };

    state = {
        direction: direction.RIGHT,
        segments: [
            {
                row: this.props.row,
                col: this.props.col + 1
            },
            {
                row: this.props.row,
                col: this.props.col
            }
        ]
    };

    tick = () => {
        --this.rafCounter;

        if (!this.rafCounter) {
            this.rafCounter = this.props.delay;
            this.move();
        }

        requestAnimationFrame(this.tick);
    };

    componentDidMount() {
        this.rafCounter = this.props.delay;
        requestAnimationFrame(this.tick);
    }

    move() {
        this.setState(prevState => {
            const [...segments] = prevState.segments;
            const { deltaRow, deltaCol } = prevState.direction;

            const head = segments[0];
            const tail = segments.pop();

            // tail is now the new head
            tail.row = head.row + deltaRow;
            tail.col = head.col + deltaCol;
            segments.unshift(tail);

            return {
                ...prevState,
                segments
            };
        });
    }

    render() {
        const { segments } = this.state;
        return (
            <Fragment>
                {segments.map((segment, index) => (
                    <Segment
                        key={index}
                        row={segment.row}
                        col={segment.col}
                        paint={this.props.paint}
                        clear={this.props.clear}
                    />
                ))}
            </Fragment>
        );
    }
}

export default Snake;
