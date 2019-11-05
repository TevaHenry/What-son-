import React from 'react';

import LanguageChoice from '../LanguageChoice/LanguageChoice';

import {
  LanguageToggleContainer
} from './LanguageToggleStyles';

const LanguageToggle = ({ heading }) => (
  <LanguageToggleContainer>
    <h3>{heading}</h3>
    <LanguageChoice language="English"/>
    <LanguageChoice language="Français"/>
    <LanguageChoice language="Español"/>
  </LanguageToggleContainer>
)

export default LanguageToggle;