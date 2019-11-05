import React from 'react';

import {
  DisplayContainer
} from './DisplayStyles';

let outputText = 'this is temporary';

const Display = ({ heading }) => (
  <DisplayContainer>
    <h3>{heading}</h3>
    <p>{outputText}</p>
  </DisplayContainer>
)

export default Display;