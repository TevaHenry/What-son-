import React from 'react';

import LanguageButton from '../LanguageButton/LanguageButton';

import {
  LanguageToggleContainer
} from './LanguageToggleStyles';

const LanguageToggle = () => (
  <LanguageToggleContainer>
    <LanguageButton />
    <LanguageButton />
    <LanguageButton />
  </LanguageToggleContainer>
)

export default LanguageToggle;