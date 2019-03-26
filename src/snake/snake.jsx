import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Segment from './segment';
import { propTypes as directionPropTypes } from '../direction';

class Snake extends PureComponent {
    static propTypes = {
        delay: PropTypes.number,
        paint: PropTypes.func,
        clear: PropTypes.func,

        direction: directionPropTypes.isRequired,
        startRow: PropTypes.number.isRequired,
        startCol: PropTypes.number.isRequired
    };

    static defaultProps = {
        delay: 0,
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
