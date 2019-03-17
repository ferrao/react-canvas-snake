import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import './board.css';

class Board extends PureComponent {
    static propTypes = {
        cols: PropTypes.number.isRequired,
        rows: PropTypes.number.isRequired,

        children: PropTypes.node.isRequired
    };

    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidMount() {
        const canvas = this.ref.current;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        this.ctx = canvas.getContext('2d');
        this.ctx.fillStyle = 'rgb(200,0,0)';

        this.cellWidth = canvas.width / this.props.cols;
        this.cellHeight = canvas.height / this.props.rows;
    }

    toRectangle = (row, col) => ({
        x: (col % this.props.cols) * this.cellWidth,
        y: (row % this.props.rows) * this.cellHeight,
        width: this.cellWidth,
        height: this.cellHeight
    });

    paint = (row, col) => {
        const { x, y, width, height } = this.toRectangle(row, col);
        this.ctx.fillRect(x, y, width, height);
    };

    clear = (row, col) => {
        const { x, y, width, height } = this.toRectangle(row, col);
        this.ctx.clearRect(x, y, width, height);
    };

    render() {
        const segment = React.cloneElement(this.props.children, {
            paint: this.paint,
            clear: this.clear
        });

        return (
            <Fragment>
                <canvas className="canvas-snake" ref={this.ref} />
                {segment}
            </Fragment>
        );
    }
}

export default Board;
