import React from 'react';

import LanguageChoice from '../LanguageChoice/LanguageChoice';

import {
  LanguageToggleContainer
} from './LanguageToggleStyles';

const LanguageToggle = ({ heading, handler }) => (
  <LanguageToggleContainer>
    <h3>{heading}</h3>
    <LanguageChoice language="English" languageCode="en-US" handler={handler}/>
    <LanguageChoice language="Français" languageCode="fr-FR" handler={handler}/>
    <LanguageChoice language="Español" languageCode="es-ES" handler={handler}/>
  </LanguageToggleContainer>
)

export default LanguageToggle;