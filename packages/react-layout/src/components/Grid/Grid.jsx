/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const propTypes = {
  templateAreas: PropTypes.arrayOf(PropTypes.string).isRequired,
  templateColumns: PropTypes.string,
  gap: PropTypes.string,
  elements: PropTypes.arrayOf(PropTypes.shape({ 
    selector: PropTypes.string.isRequired,
    gridArea: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ render: PropTypes.func.isRequired }),
    ]).isRequired,
    props: PropTypes.object,
  })).isRequired,
};

const Grid = styled.div`
  display: grid;
  grid-template-areas: ${props => props.templateAreas.map(row => `"${row}"`).join(' ')};
  grid-template-columns: ${props => props.templateColumns};
  grid-gap: ${props => props.gap};
  
  ${props => props.elements
    .map(element => `${element.selector} { grid-area: ${element.gridArea}; ${element.style || ''} }`)
    .join(' ')}
`;

const CssGrid = (props) => 
  (<Grid {...props}>
    {
      props.elements.map((element, index) => {
        const GenericComponent = element.component;
        return <GenericComponent key={index} {...element.props} />;
      })
    }
  </Grid>);

CssGrid.propTypes = propTypes;

export default CssGrid;
