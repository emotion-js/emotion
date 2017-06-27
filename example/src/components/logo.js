import React from 'react';
import logoUrl from '../../../emotion.png';
import styled from 'emotion/styled';

const Logo = styled('img')`
  height: 100px;
  width: 100px;
`

export default () => {
  return <Logo src={logoUrl}/>
}
