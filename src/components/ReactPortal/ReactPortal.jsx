import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function ReactPortal({ containerId, children }) {
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', containerId);
    document.body.appendChild(container);
  }

  return ReactDOM.createPortal(children, container);
}

export default ReactPortal;

ReactPortal.propTypes = {
  containerId: PropTypes.string,
  children: PropTypes.node.isRequired,
};

ReactPortal.defaultProps = {
  containerId: 'portal-root',
};
