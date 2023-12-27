import PropTypes from 'prop-types';
import { Overlay } from './styles';
import Spinner from '../Spinner/Spinner';
import ReactPortal from '../ReactPortal/ReactPortal';
import useAnimatedUnmount from '../../hooks/useUnimatedUnmount';

function Loader({ isLoading }) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(isLoading);

  if (!shouldRender) { return null; }

  return (
    <ReactPortal containerId="loader-root">
      <Overlay ref={animatedElementRef} isLeaving={!isLoading}>
        <Spinner size={90} />
      </Overlay>
      ,
    </ReactPortal>
  );
}

export default Loader;

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
