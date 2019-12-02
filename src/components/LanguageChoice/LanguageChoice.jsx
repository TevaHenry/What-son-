import React, { useState } from 'react';

import {
  LanguageChoiceContainer
} from './LanguageChoiceStyles';

const LanguageChoice = ({ language, languageCode, handler }) => {
  const [ isPressed, setIsPressed ] = useState(false);

  return (
    <LanguageChoiceContainer>
      <button className={isPressed ? "pressed" : null} onClick={(event) => {
        setIsPressed(isPressed => !isPressed)
        handler(languageCode, event)}
        }>{languageCode.slice(0, 2).toUpperCase()}</button>
      <h5>{language}</h5>
    </LanguageChoiceContainer>
  )
}

export default LanguageChoice;