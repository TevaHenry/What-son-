import React from 'react';

import Display from '../Display/Display';

import {
  OutputContainer
} from './OutputStyles';

const Output = ({ originalLanguage, originalText, translatedLanguage, translatedText }) => (
  <OutputContainer>
    <Display heading={originalLanguage} outputText={originalText}/>
    <Display heading={translatedLanguage} outputText={translatedText}/>
  </OutputContainer>
)

export default Output;