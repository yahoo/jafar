/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import ItemView from '../ItemView';
import MobileItemView from '../MobileItemView';

export const layoutTypes = {
  TABS: 'tabs',
  SCROLL: 'scroll',
  MOBILE: 'mobile',
};
export default class Item extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    layout: PropTypes.oneOf(Object.values(layoutTypes)),
    sections: PropTypes.array.isRequired,
    selected: PropTypes.object,
    mainActions: PropTypes.array,
    optionsActions: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected || {},
    };
  }

  render() {
    // filter section by exclude condition
    const filteredSections = filterSectionsByExcludeCondition(this.props.sections);

    if (filteredSections.length === 0) {
      return null;
    }

    const mainActions = this.props.mainActions ? prepareActions(this.props.mainActions) : undefined;
    const optionsActions = this.props.optionsActions ? prepareActions(this.props.optionsActions) : undefined;

    switch (this.props.layout) {
    case layoutTypes.MOBILE: {
      return (<MobileItemView title={this.props.title} sections={filteredSections} mainActions={mainActions}
        optionsActions={optionsActions} />);
    }
    default: {
      const selectedSectionId = this.state.selected.sectionId || filteredSections[0].id;

      // create the tabs menu items from the sections structure
      const tabs = this.props.layout ? {
        items: filteredSections.map(section => ({ value: section.id, label: section.title })),
        value: selectedSectionId,
        onChange: this.onChangeTab,
      } : undefined;

      this.mainActionsRefs = this.mainActionsRefs || {};
      (mainActions || []).forEach((action) => {
        if (action.popover) {
          if (!this.mainActionsRefs[action.label]) {
            this.mainActionsRefs[action.label] = React.createRef();
          }
          action.elementRef = this.mainActionsRefs[action.label];
          action.popover.targetRef = this.mainActionsRefs[action.label];
        }
      });

      this.sectionsRef = React.createRef();
      this.sectionsRefs = {};
      filteredSections.forEach((section) => {
        this.sectionsRefs[section.id] = React.createRef();
      });

      // prepare the current displayed sections and add ref to sections
      let sections = filteredSections.map(section => ({ ...section, ref: this.sectionsRefs[section.id] }));

      // if tabs layout - show only selected tab
      if (this.props.layout === layoutTypes.TABS) {
        sections = [sections.find(section => section.id === selectedSectionId)];
      }

      // prepare footer
      const footer = this.props.mainActions ? { actions: mainActions } : undefined;

      // prepare options
      const options = this.props.optionsActions ? { actions: optionsActions } : undefined;

      return (<ItemView title={this.props.title} tabs={tabs} sections={sections} sectionsRef={this.sectionsRef}
        footer={footer} options={options} />);
    }
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.selected && props.selected !== state.selected && props.selected !== state.prevSelected) {
      return ({
        needScroll: true,
        selected: props.selected,
        prevSelected: props.selected, // react doesn't provide prev props for compare here and in componentDidUpdate
      });
    }
    return null;
  }

  componentDidUpdate() {
    if (this.state.needScroll) {
      this.setState({
        needScroll: false,
      });

      // scroll to element
      if (this.state.selected.elementId) {
        const sections = this.sectionsRef.current;
        sections.scrollTo({
          top: sections.querySelector(`#${this.state.selected.elementId}`).offsetTop - sections.offsetTop - 10,
          left: 0,
          behavior: 'smooth',
        });
      }
    }
  }

  onChangeTab = (event, selectedSectionId) => {
    this.setState({
      selected: { sectionId: selectedSectionId, elementId: undefined },
    });

    // if scroll layout - scroll to section
    if (this.props.layout === layoutTypes.SCROLL) {
      this.sectionsRefs[selectedSectionId].current.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

function filterSectionsByExcludeCondition(sections = []) {
  const newSections = sections.map(s => ({ ...s }));
  return newSections.filter((section) => {
    const renderSections = filterSectionsByExcludeCondition(section.sections);
    if (renderSections.length) {
      section.sections = renderSections;
    }
    return !(section.exclude && section.exclude()) || section.sections;
  });
}

function prepareActions(actions) {
  return actions
    .filter(action => !(action.exclude && action.exclude()))
    .map(action => Object.assign({}, action, {
      disabled: action.disable && action.disable(),
    }));
}
