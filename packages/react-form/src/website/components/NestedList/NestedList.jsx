/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Styled from './StyledComponents';

export default class NestedList extends React.Component {
  static propTypes = {
    menu: PropTypes.array.isRequired,
    selected: PropTypes.object,
    onItemClick: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.selected !== prevState.selected) {
      return openSelectedItem(nextProps.menu, nextProps.selected);
    }
    return null;
  }
  render() {
    const { menu } = this.props;
    const items = menu.map(item => this.getRenderItem(item));
    return (<Styled.List component="nav">{items}</Styled.List>);
  }

  getRenderItem(item) {
    let childItems;
    let nestedLevel = 1;
    if (item.items && !item.hideChildren) {
      childItems = this.getRenderItems(item.items, item.id);
      nestedLevel = 0;
    } else if (item.isLeaf) {
      nestedLevel = 0;
    }

    return (!item.hide && <React.Fragment key={item.id}>
      <Styled.ListItem
        item-id={item.id}
        level={nestedLevel}
        button={true}
        component={!item.items || item.hideChildren ? Link : undefined}
        to={!item.items || item.hideChildren ? item.id : undefined}
        onClick={() => this.onItemClick(item)}
        selected={item === this.props.selected}>
        <ListItemText inset={true} primary={item.label} />
      </Styled.ListItem>
      {childItems}
    </React.Fragment>);
  }

  getRenderItems(items, id = '') {
    const itemsElements = items.map(currItem => this.getRenderItem(currItem));
    return (<Collapse in={this.state[id]} timeout="auto" unmountOnExit={true}>
      {itemsElements}
    </Collapse>);
  }

  onItemClick = (item) => {
    if (item.items && !item.hideChildren) {
      this.setState(state => ({ [item.id]: !state[item.id] }));
    } else {
      this.props.onItemClick && this.props.onItemClick(item);
    }
  };
}

function getParent(menu, item) {
  return menu && menu.find(parent => parent.items && parent.items.find(x => x === item));
}

function openSelectedItem(menu, item) {
  if (item) {
    let state = {};
    state = {
      [item.id]: true,
    };
    const parent = getParent(menu, item);
    if (parent) {
      state[parent.id] = true;
    }
    return state;
  }
  return null;
}
