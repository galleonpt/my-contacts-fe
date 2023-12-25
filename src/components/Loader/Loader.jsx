import { Overlay } from './styles';
import Spinner from '../Spinner/Spinner';
import ReactPortal from '../ReactPortal/ReactPortal';

function Loader() {
  return (
    <ReactPortal containerId="loader-root">
      <Overlay>
        <Spinner size={90} />
      </Overlay>
      ,
    </ReactPortal>
  );
}

export default Loader;
