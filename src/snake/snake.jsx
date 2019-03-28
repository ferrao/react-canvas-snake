import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Segment from './segment';
import { propTypes as directionPropTypes } from '../direction';

class Snake extends PureComponent {
    static propTypes = {
        delay: PropTypes.number,
        paint: PropTypes.func,
        clear: PropTypes.func,
        move: PropTypes.bool,

        direction: directionPropTypes.isRequired,
        startRow: PropTypes.number.isRequired,
        startCol: PropTypes.number.isRequired
    };

    static defaultProps = {
        delay: 0,
        move: false,
        paint: () => {},
        clear: () => {}
    };

    state = {
        segments: [
            {
                row: this.props.startRow,
                col: this.props.startCol + 1
            },
            {
                row: this.props.startRow,
                col: this.props.startCol
            }
        ]
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
