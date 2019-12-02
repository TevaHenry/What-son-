import React from 'react';

import {
  DisplayContainer
} from './DisplayStyles';

const Display = ({ heading, outputText }) => (
  <DisplayContainer>
    <h3>{heading}</h3>
    <p>{outputText}</p>
  </DisplayContainer>
)

export default Display;