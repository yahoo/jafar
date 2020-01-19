/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import styled from 'styled-components';
import Button from '../Button';
import Popover from '../Popover';

const Wrapper = styled.div`
  flex: 0 0 auto;
  display: flex;
  direction: row;
  background: hsla(0,0%,99%,.9);
  opacity: 1;
  padding: 22px;
  box-shadow: 0 -3px 3px 0 hsla(0,0%,75%,.5);
  z-index: 20;
  pointer-events: auto;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  direction: row;
  flex-grow: 1;
  justify-content: flex-end;
`;

const ButtonWrapper = styled.div`
  margin-left: 15px;
`;

const Footer = props => (<Wrapper {...props}>
  <ButtonsWrapper>
    {
      props.actions.map(action => (<ButtonWrapper key={action.label}>
        <Button {...action} />
        { action.popover ? <Popover { ...action.popover } /> : null }
      </ButtonWrapper>))
    }
  </ButtonsWrapper>
</Wrapper>);

export default Footer;
