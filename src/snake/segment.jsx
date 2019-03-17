import { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Segment extends PureComponent {
    static propTypes = {
        paint: PropTypes.func.isRequired,
        clear: PropTypes.func.isRequired,

        row: PropTypes.number.isRequired,
        col: PropTypes.number.isRequired
    };

    componentDidMount() {
        const { col, row } = this.props;

        // make sure the whole tree is mounted and
        // canvas exists before painting
        requestAnimationFrame(
            function() {
                this.props.paint(row, col);
            }.bind(this)
        );
    }

    componentDidUpdate(prevProps) {
        const { col: prevCol, row: prevRow } = prevProps;
        const { col, row } = this.props;

        this.props.paint(row, col);
        this.props.clear(prevRow, prevCol);
    }

    render() {
        return null;
    }
}

export default Segment;
