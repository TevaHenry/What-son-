import React from 'react';

import { ReactComponent as Info} from '../../assets/info.svg';

import {
  HeaderContainer, InfoContainer
} from './HeaderStyles';

const Header = () => (
  <HeaderContainer>
    <h1>What, son?</h1>
    <InfoContainer>
      <Info className="info"/>
    </InfoContainer>
  </HeaderContainer>
)

export default Header;