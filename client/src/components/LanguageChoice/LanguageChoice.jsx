import React from 'react';

import {
  LanguageChoiceContainer
} from './LanguageChoiceStyles';

const LanguageChoice = ({ language, languageCode, handler }) => (
  <LanguageChoiceContainer>
    <button onClick={(event) => {handler(languageCode, event)}}>
      {languageCode.slice(0, 2).toUpperCase()}
    </button>
    <h5>{language}</h5>
  </LanguageChoiceContainer>
)

export default LanguageChoice;