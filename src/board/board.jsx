import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import './board.css';

class Board extends PureComponent {
    static propTypes = {
        cols: PropTypes.number.isRequired,
        rows: PropTypes.number.isRequired,
        onCrash: PropTypes.func,

        children: PropTypes.node.isRequired
    };

    static defaultProps = {
        onCrash: () => {}
    };

    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidMount() {
        const canvas = this.ref.current;

        // make canvas use all container space
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        this.ctx = canvas.getContext('2d');
        this.ctx.fillStyle = 'rgb(200,0,0)';

        this.cellWidth = canvas.width / this.props.cols;
        this.cellHeight = canvas.height / this.props.rows;
    }

    inBounds = (row, col) => row >= 0 && row < this.props.rows && col >= 0 && col < this.props.cols;

    toRectangle = (row, col) => ({
        x: (col % this.props.cols) * this.cellWidth,
        y: (row % this.props.rows) * this.cellHeight,
        width: this.cellWidth,
        height: this.cellHeight
    });

    paint = (row, col) => {
        if (!this.inBounds(row, col)) {
            this.props.onCrash();
            return;
        }

        const { x, y, width, height } = this.toRectangle(row, col);
        this.ctx.fillRect(x, y, width, height);
    };

    clear = (row, col) => {
        const { x, y, width, height } = this.toRectangle(row, col);
        this.ctx.clearRect(x, y, width, height);
    };

    render() {
        const snake = React.cloneElement(this.props.children, {
            paint: this.paint,
            clear: this.clear
        });

        return (
            <Fragment>
                <canvas className="canvas-snake" ref={this.ref} />
                {snake}
            </Fragment>
        );
    }
}

export default Board;
