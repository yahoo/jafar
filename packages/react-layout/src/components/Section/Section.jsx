/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import Styled from './Styled';

const SectionShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  innerRef: PropTypes.object,
  boxes: PropTypes.arrayOf(PropTypes.object),
  level: PropTypes.oneOf([1, 2]),
  showBorder: PropTypes.bool,
  smallLayout: PropTypes.bool,
};
SectionShape.sections = PropTypes.arrayOf(PropTypes.shape(SectionShape));

export class Section extends React.Component {
  static propTypes = SectionShape;

  static defaultProps = {
    level: 1,
    boxes: [],
  };

  render() {
    const Wrapper = this.props.smallLayout ? Styled.SmallWrapper : Styled.Wrapper;
    const Title = this.props.smallLayout ? Styled.SmallTitle : Styled.Title;

    return (<div ref={this.props.innerRef} id={this.props.id}>
      <Wrapper level={this.props.level} showBorder={this.props.showBorder}>
        {
          this.props.title && <Title level={this.props.level}>{this.props.title}</Title>
        }
        {
          this.props.boxes.map((box, index) => (<Box key={index} { ...box } />))
        }
        {
          (this.props.sections || []).length > 0 && this.props.sections.map(section => (<Section
            key={section.id} {...section} level={section.level || this.props.level + 1} />))
        }
      </Wrapper>
    </div>);
  }
}

export default React.forwardRef((props, ref) => <Section innerRef={ref} {...props} />);
