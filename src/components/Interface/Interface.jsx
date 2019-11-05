import React from 'react';

import LanguageToggle from '../LanguageToggle/LanguageToggle';
import Mic from '../Mic/Mic';

import {
  InterfaceContainer
} from './InterfaceStyles';

const Interface = () => (
  <InterfaceContainer>
    <LanguageToggle heading="From"/>
    <Mic />
    <LanguageToggle heading="To"/>
  </InterfaceContainer>
)

export default Interface;