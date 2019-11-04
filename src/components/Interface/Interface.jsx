import React from 'react';

import LanguageToggle from '../LanguageToggle/LanguageToggle';
import Mic from '../Mic/Mic';

import {
  InterfaceContainer
} from './InterfaceStyles';

const Interface = () => (
  <InterfaceContainer>
    <LanguageToggle />
    <Mic />
    <LanguageToggle />
  </InterfaceContainer>
)

export default Interface;