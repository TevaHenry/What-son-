import React from 'react';

import LanguageButton from '../LanguageButton/LanguageButton';

import {
  LanguageChoiceContainer
} from './LanguageChoiceStyles';

const LanguageChoice = ({ language }) => (
  <LanguageChoiceContainer>
    <LanguageButton />
    <h5>{language}</h5>
  </LanguageChoiceContainer>
)

export default LanguageChoice;