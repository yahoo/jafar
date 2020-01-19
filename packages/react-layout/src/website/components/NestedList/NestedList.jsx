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
    const item = this.props.selected;
    this.state = {};
    if (item) {
      this.state = {
        [item.id]: true,
      };
      const parent = this.getParent(item);
      if (parent) {
        this.state[parent.id] = true;
      }
    }
  }

  getParent(item) {
    return this.props && this.props.menu && this.props.menu.find(parent => parent.items && parent.items.find(x => x === item));
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
        id={item.id}
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
