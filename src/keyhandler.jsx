import { Component } from 'react';
import PropTypes from 'prop-types';

const key = {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    UP: 'ArrowUp',
    DOWN: 'ArrowDown'
};

class KeyHandler extends Component {
    static propTypes = {
        keyValue: PropTypes.oneOf(Object.values(key)).isRequired,
        onKey: PropTypes.func.isRequired
    };

    componentDidMount() {
        window.document.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
        window.document.removeEventListener('keydown', this.handleKeyPress);
    }

    shouldComponentUpdate() {
        return false;
    }

    handleKeyPress = ({ key }) => {
        if (key === this.props.keyValue) {
            this.props.onKey();
        }
    };

    render() {
        return null;
    }
}

export default KeyHandler;
export { key };
