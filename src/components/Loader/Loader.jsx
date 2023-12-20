import ReactDom from 'react-dom';
import { Overlay } from './styles';
import Spinner from '../Spinner/Spinner';

function Loader() {
  return ReactDom.createPortal(
    <Overlay>
      <Spinner size={90} />
    </Overlay>,
    document.getElementById('loader-root'),
  );
}

export default Loader;
