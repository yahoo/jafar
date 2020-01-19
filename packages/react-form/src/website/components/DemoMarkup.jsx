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
    this.fields = this.getFile('fields');
    this.components = this.getFile('components');
    this.index = this.getFile('index');
    this.data = this.props.data ? this.getFile('data') : undefined;
    this.conversions = this.props.conversions ? this.getFile('conversions') : undefined;
    this.validators = this.props.validators ? this.getFile('validators') : undefined;
    this.terms = this.props.terms ? this.getFile('terms') : undefined;
    this.dependenciesChanges = this.props.dependenciesChanges ? this.getFile('dependencies-changes') : undefined;
    this.hooks = this.props.hooks ? this.getFile('hooks') : undefined;
    this.mockService = this.props.mockService ? this.getFile('mocks/service') : undefined;
    this.extraComponents = this.props.extraComponents ? this.props.extraComponents
      .map(filePath => this.getFileByFullRelativePath(filePath)) : undefined;
  }

  getFile(fileName) {
    return require(`!!raw-loader!../demos/react/${this.props.exampleName}/${this.formFolder}/${fileName}.js`).default;
  }

  getFileByFullRelativePath(filePath) {
    return require(`!!raw-loader!../demos/react/${this.props.exampleName}/${filePath}.jsx`).default;
  }

  render() {
    return (<div>
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
        this.props.conversions && <div>
          <p>{this.formFolder}/conversions.js</p>
          <PrismCode className="language-javascript" component="pre">{this.conversions}</PrismCode>
        </div>
      }
      {
        this.props.validators && <div>
          <p>{this.formFolder}/validators.js</p>
          <PrismCode className="language-javascript" component="pre">{this.validators}</PrismCode>
        </div>
      }
      {
        this.props.terms && <div>
          <p>{this.formFolder}/terms.js</p>
          <PrismCode className="language-javascript" component="pre">{this.terms}</PrismCode>
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

    </div >);
  }
}
