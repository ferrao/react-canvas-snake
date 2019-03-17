import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Segment from './segment';

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
        segments: [
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
        this.setState(prevState => ({
            segments: prevState.segments.map(segment => ({
                row: segment.row + 1,
                col: segment.col + 1
            }))
        }));
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
