/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <div>
            <a target="_blank" href="https://www.yahooinc.com/" className="nav-home">
            <img
              src={this.props.config.baseUrl + 'img/yahooinc-white.png'}
              alt={this.props.config.title}
              width="100"
              height="58"
            />
            </a> 
            <div className="copyright">{this.props.config.copyright}</div>
          </div>
          <div>
            <h5>DOCS</h5>
            <a href={this.docUrl('introduction')}>Introduction</a>
            <a href={this.docUrl('form-overview')}>Form Class</a>
            <a href={this.docUrl('react-overview')}>React Form</a>
            <a href={this.docUrl('react-components')}>React Components</a>
            <a href={this.docUrl('react-layout')}>React Layout</a>
          </div>
          <div>
            <h5>DEMOS</h5>
            <a href={this.pageUrl('demo-react-form')}>React Form</a>
            <a href={this.pageUrl('demo-react-components')}>React Components</a>
            <a href={this.pageUrl('demo-react-layout')}>React Layout</a>
          </div>
        </section>
        <section className="sitemap">
          <div></div>
          <div>
            <h5>CONTRIBUTING</h5>
            <a href={this.docUrl('code-of-conduct')}>Code Of Conduct</a>
            <a href={this.docUrl('contributing-guide')}>Contributing Guide</a>
            <a href={this.pageUrl('users')}>Users</a>
          </div>
          <div>
            <h5>CHANNELS</h5>
            {/* <a href={`${this.props.config.baseUrl}blog/index.html`}>Blog</a> */}
 
            <a
              target="_blank"
              className="github-button"
              href={this.props.config.repoUrl}
              data-icon="octicon-star"
              data-count-href="/facebook/docusaurus/stargazers"
              data-show-count="true"
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub">
              Star
            </a>
            <a target="_blank" href="https://github.com/yahoo/jafar">GitHub</a>
            <a target="_blank" href="https://stackoverflow.com/questions/tagged/jafar">Stack Overflow</a>
            <a target="_blank" href="https://medium.com/search?q=jafar">Medium</a>
            <a href={this.docUrl('videos')}>Videos</a>
          </div>
        </section>

        {/* <a
          href="https://code.facebook.com/projects/"
          target="_blank"
          rel="noreferrer noopener"
          className="fbOpenSource">
          <img
            src={`${this.props.config.baseUrl}img/oss_logo.png`}
            alt="Facebook Open Source"
            width="170"
            height="45"
          />
        </a> */}

        {/* <section className="copyright">{this.props.config.copyright}</section> */}

      </footer>
    );
  }
}

module.exports = Footer;
