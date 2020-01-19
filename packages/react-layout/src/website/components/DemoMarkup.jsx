/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PrismCode from 'react-prism';
import 'prismjs';
import 'prismjs/themes/prism.css';
import Styled from './StyledComponents';

export default class DemoMarkup extends React.Component {
  constructor(props) {
    super(props);
    this.formFolder = this.props.formFolder || 'form';
    this.fields = this.getFile(`${this.formFolder}/fields`);
    this.components = this.getFile(`${this.formFolder}/components`);
    this.index = this.getFile(`${this.formFolder}/index`);
    this.data = this.props.data ? this.getFile(`${this.formFolder}/data`) : undefined;
    this.stateChanges = this.props.stateChanges ? this.getFile(`${this.formFolder}/state-changes`) : undefined;
    this.formatters = this.props.formatters ? this.getFile(`${this.formFolder}/formatters`) : undefined;
    this.parsers = this.props.parsers ? this.getFile(`${this.formFolder}/parsers`) : undefined;
    this.validators = this.props.validators ? this.getFile(`${this.formFolder}/validators`) : undefined;
    this.excludeTerm = this.props.excludeTerm ? this.getFile(`${this.formFolder}/exclude-term`) : undefined;
    this.dependenciesChanges = this.props.dependenciesChanges
      ? this.getFile(`${this.formFolder}/dependecies-changes`) : undefined;
    this.disableTerm = this.props.disableTerm ? this.getFile(`${this.formFolder}/disable-term`) : undefined;
    this.hooks = this.props.hooks ? this.getFile(`${this.formFolder}/hooks`) : undefined;
    this.mockService = this.props.mockService ? this.getFile(`${this.formFolder}/mock-service`) : undefined;
    this.extraComponents = this.props.extraComponents ? this.props.extraComponents
      .map(filePath => this.getFileByFullRelativePath(filePath)) : undefined;
    this.item = {
      sections: this.getFile('sections'),
      sectionsMobile: this.props.sectionsMobile ? this.getFile('sections-mobile') : undefined,
    };
  }

  getFile(fileName) {
    return require(`!!raw-loader!../demos/${this.props.exampleName}/${fileName}.js`).default;
  }

  getFileByFullRelativePath(filePath) {
    return require(`!!raw-loader!../demos/${this.props.exampleName}/${filePath}.jsx`).default;
  }

  render() {
    return (<div>
      {
        !this.props.hideHtml
        && <div>
          <Styled.H3>Components</Styled.H3>
          <p>Demo.jsx</p>
          <PrismCode className="language-javascript" component="pre">{this.props.demo}</PrismCode>
          {
            this.extraComponents && <div>{
              this.extraComponents.map((componentHtml, index) => (<div key={index}>
                <p>{this.props.extraComponents[index]}.jsx</p>
                <PrismCode className="language-javascript" component="pre">{componentHtml}</PrismCode>
              </div>))
            }</div>
          }
        </div>
      }
      <Styled.H3>Item definition</Styled.H3>
      <p>sections.js</p>
      <PrismCode className="language-javascript" component="pre">{this.item.sections}</PrismCode>
      {
        this.item.sectionsMobile && <div>
          <p>sections-mobile.js</p>
          <PrismCode className="language-javascript" component="pre">{this.item.sectionsMobile}</PrismCode>
        </div>
      }
      <Styled.H3>Form definition</Styled.H3>
      <p>{this.formFolder}/fields.js</p>
      <PrismCode className="language-javascript" component="pre">{this.fields}</PrismCode>
      {
        this.data && <div>
          <p>{this.formFolder}/data.js</p>
          <PrismCode className="language-javascript" component="pre">{this.data}</PrismCode>
        </div>
      }
      <p>{this.formFolder}/components.js</p>
      <PrismCode className="language-javascript" component="pre">{this.components}</PrismCode>
      {
        this.props.stateChanges && <div>
          <p>{this.formFolder}/state-changes.js</p>
          <PrismCode className="language-javascript" component="pre">{this.stateChanges}</PrismCode>
        </div>
      }
      {
        this.props.formatters && <div>
          <p>{this.formFolder}/formatters.js</p>
          <PrismCode className="language-javascript" component="pre">{this.formatters}</PrismCode>
        </div>
      }
      {
        this.props.parsers && <div>
          <p>{this.formFolder}/parsers.js</p>
          <PrismCode className="language-javascript" component="pre">{this.parsers}</PrismCode>
        </div>
      }
      {
        this.props.validators && <div>
          <p>{this.formFolder}/validators.js</p>
          <PrismCode className="language-javascript" component="pre">{this.validators}</PrismCode>
        </div>
      }
      {
        this.props.excludeTerm && <div>
          <p>{this.formFolder}/exclude-term.js</p>
          <PrismCode className="language-javascript" component="pre">{this.excludeTerm}</PrismCode>
        </div>
      }
      {
        this.props.disableTerm && <div>
          <p>{this.formFolder}/disable-term.js</p>
          <PrismCode className="language-javascript" component="pre">{this.disableTerm}</PrismCode>
        </div>
      }
      {
        this.props.dependenciesChanges && <div>
          <p>{this.formFolder}/dependencies-changes.js</p>
          <PrismCode className="language-javascript" component="pre">{this.dependenciesChanges}</PrismCode>
        </div>
      }
      {
        this.props.hooks && <div>
          <p>{this.formFolder}/hooks.js</p>
          <PrismCode className="language-javascript" component="pre">{this.hooks}</PrismCode>
        </div>
      }
      <p>{this.formFolder}/index.js</p>
      <PrismCode className="language-javascript" component="pre">{this.index}</PrismCode>
      {
        this.props.mockService && <div>
          <p>{this.formFolder}/mocks/service.js</p>
          <PrismCode className="language-javascript" component="pre">{this.mockService}</PrismCode>
        </div>
      }

    </div >);
  }
}
