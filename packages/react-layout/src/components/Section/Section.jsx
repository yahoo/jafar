/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import Grid from '../Grid';
import Styled from './Styled';

const SectionShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  innerRef: PropTypes.object,
  grid: PropTypes.object,
  boxes: PropTypes.arrayOf(PropTypes.object),
  size: PropTypes.number,
  root: PropTypes.bool,
};
SectionShape.sections = PropTypes.arrayOf(PropTypes.shape(SectionShape));

export class Section extends React.Component {
  static propTypes = SectionShape;

  static defaultProps = {
    size: 4,
    root: true,
    boxes: [],
  };

  render() {
    const { Wrapper, Title } = Styled(this.props.size, this.props.root);

    return (<Wrapper ref={this.props.innerRef} id={this.props.id}>
      {
        this.props.title && <Title>{this.props.title}</Title>
      }
      {
        this.props.grid && <Grid {...this.props.grid} />
      }
      {
        this.props.boxes.map((box, index) => (<Box key={index} { ...box } />))
      }
      {
        (this.props.sections || []).length > 0 && this.props.sections.map(section => (<Section
          key={section.id} size={this.props.size - 1} root={false} {...section} />))
      }
    </Wrapper>);
  }
}

export default React.forwardRef((props, ref) => <Section innerRef={ref} {...props} />);
