import React from 'react';

import Display from '../Display/Display';

import {
  OutputContainer
} from './OutputStyles';

const Output = () => (
  <OutputContainer>
    <Display heading="Original text"/>
    <Display heading="Translated text"/>
  </OutputContainer>
)

export default Output;