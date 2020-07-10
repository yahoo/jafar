/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Section from '../Section';
import Menu from '../Menu';
import { ITEM_HEIGHT } from '../Menu/Menu';
import Style from './Styled';

const menuRef = React.createRef();
const elementRef = React.createRef();

function MobileItemView(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const Styled = Style(props.size);

  return (<Styled.Wrapper ref={elementRef}>
    {
      (props.title || props.mainActions || props.optionsActions) && <Styled.Header>
        {
          props.title
            && <Styled.Title>{props.title}</Styled.Title>
        }
        {
          props.mainActions && <span>{ props.mainActions
            .filter(action => action.icon)
            .map((action, index) => {
              const Icon = action.icon;
              const key = action.label || index;
              return (<IconButton key={key} aria-label={key}
                color="primary" disabled={action.disabled} onClick={action.onClick}><Icon /></IconButton>)
              ;
            }) }</span>
        }
        {
          props.optionsActions
            && <React.Fragment>
              <IconButton color="primary" onClick={openMenu} aria-label="Options"><MoreVertIcon /></IconButton>
              <Menu options={props.optionsActions} anchorEl={menuRef.current} open={isMenuOpen}
                onClose={closeMenu}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                style={{
                  height: `${(props.optionsActions.length * ITEM_HEIGHT) + 10}px`,
                  maxHeight: `${((elementRef.current || {}).clientWidth - 100)}px`,
                  width: `${((elementRef.current || {}).clientWidth - 40)}px`,
                  marginTop: '-20px',
                }} />
            </React.Fragment>
        }
      </Styled.Header>
    }
    <Styled.Sections aria-label="Sections">
      {
        props.sections.map((section, index) => (<Section key={section.id} size={props.size} {...section} />))
      }
    </Styled.Sections>
    <div id="menu-anchor" ref={menuRef} />
  </Styled.Wrapper>);
}

MobileItemView.propTypes = {
  title: PropTypes.string,
  sections: PropTypes.array.isRequired,
  mainActions: PropTypes.array,
  optionsActions: PropTypes.array,
  size: PropTypes.number,
};

MobileItemView.defaultProps = {
  size: 1,
};

export default MobileItemView;
