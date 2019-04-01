import PropTypes from 'prop-types';

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

const isReverse = direction => direction.deltaRow < 0 || direction.deltaCol < 0;

const propTypes = PropTypes.shape({
    deltaRow: PropTypes.number.isRequired,
    deltaCol: PropTypes.number.isRequired
});

export default direction;
export { isReverse, propTypes };
