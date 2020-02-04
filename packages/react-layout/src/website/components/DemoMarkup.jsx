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
    this.index = this.getFile(`${this.formFolder}/index`);
    this.fields = this.getFile(`${this.formFolder}/fields`);
    this.components = this.getFile(`${this.formFolder}/components`);
    this.data = this.props.data ? this.getFile(`${this.formFolder}/data`) : undefined;
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

  download = () => {
    const rootFolder = new JSZip();

    // add form folder
    const formFolder = rootFolder.folder(this.formFolder);
    formFolder.file('index.js', this.index);
    formFolder.file('fields.js', this.fields);
    formFolder.file('components.js', this.components);
    if (this.data) formFolder.file('data.js', this.data);

    // add demo file
    rootFolder.file('demo.jsx', this.props.demo);

    // add sections files
    rootFolder.file('sections.js', this.item.sections);
    if (this.item.sectionsMobile) rootFolder.file('sections-mobile.js', this.item.sectionsMobile);

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
    </Styled.DemoWrapper>);
  }
}
