/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import Styled from './Styled';

const BoxShape = {
  direction: PropTypes.oneOf(['column', 'row']),
  style: PropTypes.object,
  component: PropTypes.func,
  props: PropTypes.object,
};
BoxShape.boxes = PropTypes.arrayOf(PropTypes.shape(BoxShape));

export default class Box extends React.Component {
  static propTypes = BoxShape;

  static defaultProps = {
    direction: 'column',
    style: {},
    boxes: [],
    component: undefined,
    props: {},
  };

  render() {
    if (this.props.component) {
      const GenericComponent = this.props.component;
      return <GenericComponent {...this.props.props} />;
    }

    const Wrapper = this.props.direction === 'row' ? Styled.Row : Styled.Column;
    return (<Wrapper {...this.props.style}>{this.props.boxes.map((box, index) => (<Box key={index} {...box} />))}</Wrapper>);
  }
}
