import React from 'react';

import Header from '../../components/Header/Header';
import Interface from '../../components/Interface/Interface';
import Output from '../../components/Output/Output';

import {
  MainPageContainer
} from './MainPageStyles';

const MainPage = () => (
  <MainPageContainer>
    <Header />
    <Interface />
    <Output />
  </MainPageContainer>
)

export default MainPage;