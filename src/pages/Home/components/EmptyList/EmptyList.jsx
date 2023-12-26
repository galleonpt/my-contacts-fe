/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-unescaped-entities */

import emptyBox from '../../../../assets/images/empty-box.svg';
import { Container } from './styles';

function EmptyList() {
  return (
    <Container>
      <img src={emptyBox} alt="empty-box" />

      <div>
        <p>
          You don't have any registered contacts yet!
          Click on the <strong>“New Contact”</strong>
          button at the top to register your first one!
        </p>
      </div>
    </Container>
  );
}

export default EmptyList;
