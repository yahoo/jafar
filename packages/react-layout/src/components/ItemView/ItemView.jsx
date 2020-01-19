
/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Section from '../Section';
import Footer from '../Footer';
import Options from '../Options';
import Styled from './Styled';

export default class ItemView extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    tabs: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })).isRequired,
      value: PropTypes.string,
      onChange: PropTypes.func,
    }),
    sections: PropTypes.array.isRequired,
    footer: PropTypes.shape({
      actions: PropTypes.array,
    }),
    options: PropTypes.shape({
      actions: PropTypes.array,
    }),
  };

  render() {
    return (<Styled.Wrapper>
      {
        (this.props.title || this.props.tabs || this.props.options) && <Styled.Header>
          {
            this.props.title
            && <Styled.Title hasTabs={this.props.tabs !== undefined}>{this.props.title}</Styled.Title>
          }
          {
            this.props.options
            && <Styled.OptionsWrapper><Options options={this.props.options.actions} /></Styled.OptionsWrapper>
          }
          {
            this.props.tabs && <Styled.TabsWrapper>
              <Tabs
                aria-label="Tabs"
                value={this.props.tabs.value}
                onChange={this.props.tabs.onChange}
                indicatorColor="primary"
                textColor="primary">
                { this.props.tabs.items.map(item => <Tab key={item.value} value={item.value} label={item.label} />) }
              </Tabs>
            </Styled.TabsWrapper>
          }
        </Styled.Header>
      }
      <Styled.Sections aria-label="Sections" ref={this.props.sectionsRef}>
        {
          this.props.sections.map((section, index) => (<Section key={section.id} {...section}
            showBorder={ index < this.props.sections.length - 1 } />))
        }
      </Styled.Sections>
      {
        this.props.footer && <Footer aria-label="Footer" actions={this.props.footer.actions} />
      }
    </Styled.Wrapper>);
  }
}
