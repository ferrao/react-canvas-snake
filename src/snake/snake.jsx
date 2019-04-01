import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Segment from './segment';
import { propTypes as directionPropTypes } from '../direction';

const buildSegments = (row, col, size) =>
    Array(size)
        .fill()
        .map((e, index) => ({
            row,
            col: col + index
        }));

class Snake extends PureComponent {
    static propTypes = {
        delay: PropTypes.number,
        paint: PropTypes.func,
        clear: PropTypes.func,
        move: PropTypes.bool,

        size: PropTypes.number,
        direction: directionPropTypes.isRequired,
        startRow: PropTypes.number.isRequired,
        startCol: PropTypes.number.isRequired
    };

    static defaultProps = {
        size: 1,
        delay: 0,
        move: false,
        paint: () => {},
        clear: () => {}
    };

    state = {
        segments: buildSegments(this.props.startRow, this.props.startCol, this.props.size)
    };

    componentDidMount() {
        this.rafCounter = this.props.delay;
        this.requestId = requestAnimationFrame(this.tick);
    }

    componentDidUpdate(prevProps) {
        // stop any ongoing animations if snake should not move
        if (!this.props.move) {
            this.cancelTick();
        }

        // snake needs to adjust its size
        if (this.props.size !== prevProps.size) {
            this.grow = this.props.size - prevProps.size;
        }

        // snake was stopped and has been instructed to move
        if (this.props.move && !prevProps.move) {
            this.requestId = requestAnimationFrame(this.tick);
        }
    }

    componentWillUnmount() {
        // snake removed from dom, stop any ongoing animations
        this.cancelTick();
    }

    tick = () => {
        // move snake if delay has elapsed
        if (this.shouldMove()) {
            this.move();
        }

        // schedule a new tick only if component is still mounted
        if (this.requestId) {
            this.requestId = requestAnimationFrame(this.tick);
        }
    };

    cancelTick() {
        cancelAnimationFrame(this.requestId);
        this.requestId = null;
    }

    shouldMove() {
        --this.rafCounter;

        if (!this.rafCounter) {
            this.rafCounter = this.props.delay;
            return true;
        }

        return false;
    }

    move() {
        this.setState(prevState => {
            const [...segments] = prevState.segments;
            const { deltaRow, deltaCol } = this.props.direction;

            const head = segments[0];

            // add a new head according to direction
            segments.unshift({
                row: head.row + deltaRow,
                col: head.col + deltaCol
            });

            const newState = { ...prevState, segments };

            // snake is growing
            if (this.grow > 0) {
                this.grow--;
                return newState;
            }

            // snake is shrinking
            if (this.grow < 0) {
                segments.pop();
                this.grow++;
            }

            segments.pop();
            return newState;
        });
    }

    render() {
        const { segments } = this.state;
        return (
            <Fragment>
                {segments.map((segment, index) => (
                    <Segment
                        /* eslint-disable react/no-array-index-key */
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
