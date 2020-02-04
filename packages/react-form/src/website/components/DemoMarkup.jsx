/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import PrismCode from 'react-prism';
import JSZip from 'jszip';
import 'prismjs';
import 'prismjs/themes/prism.css';
import Styled from './StyledComponents';

export default class DemoMarkup extends React.Component {
  constructor(props) {
    super(props);
    this.formFolder = this.props.formFolder || 'form';
    this.index = this.getFile('index');
    this.fields = this.getFile('fields');
    this.components = this.getFile('components');
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

  download = () => {
    const rootFolder = new JSZip();

    // add form folder
    const formFolder = rootFolder.folder(this.formFolder);
    formFolder.file('index.js', this.index);
    formFolder.file('fields.js', this.fields);
    formFolder.file('components.js', this.components);
    if (this.data) formFolder.file('data.js', this.data);
    if (this.conversions) formFolder.file('conversions.js', this.conversions);
    if (this.validators) formFolder.file('validators.js', this.validators);
    if (this.terms) formFolder.file('terms.js', this.terms);
    if (this.dependenciesChanges) formFolder.file('dependenciesChanges.js', this.dependenciesChanges);
    if (this.hooks) formFolder.file('hooks.js', this.hooks);
    if (this.mockService) {
      const mocksFolder = formFolder.folder('mocks');
      mocksFolder.file('service.js', this.mockService);
    }
    if (this.extraComponents) {
      this.props.extraComponents.forEach((filePath, index) => {
        let file = filePath;
        let containerFolder = rootFolder;
        if (filePath.includes('/')) {
          const arr = filePath.split('/');
          file = arr[1];
          containerFolder = rootFolder.folder(arr[0]);
        }
        containerFolder.file(`${file}.jsx`, this.extraComponents[index]);
      });
    }

    // add demo file
    rootFolder.file('demo.jsx', this.props.demo);

    rootFolder.generateAsync({ type:'blob' }).then((content) => {
      const href = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.setAttribute('href', href);
      link.setAttribute('download', `${this.props.exampleName}.zip`);
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  render() {
    return (<Styled.DemoWrapper>
      <Styled.DownloadDemo onClick={this.download}>Download</Styled.DownloadDemo>
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
    </Styled.DemoWrapper>);
  }
}
