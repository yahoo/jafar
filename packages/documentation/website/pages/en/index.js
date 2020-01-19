/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

// SUPER UGLY code - this should be changed.
class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = '' } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;
    const pageUrl = page => `${baseUrl}${page}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <div style={{ height: '0', position: 'relative', top: '-236px' }}>
          <img className="home-jafar-stand" src={`${baseUrl}img/jafar-standing-2.svg`} alt="Jafar Logo" />
        </div>
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href={docUrl('introduction.html')}>Docs</Button>
            <Button href={pageUrl('demo-react-form.html')}>Form Demo</Button>
            <Button href={pageUrl('demo-react-components.html')}>Components Demo</Button>
            <Button href={pageUrl('demo-react-layout.html')}>Layout Demo</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = '' } = this.props;
    const { baseUrl } = siteConfig;
    const pageUrl = page => `${baseUrl}${page}`;

    const Block = props => (
      <Container
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const styleBottomWrapper = {
      background: '#90A6B4',
      padding: '50px 0',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
    };

    const styleWhoUsesWrapper = {
      display: 'flex',
      flexDirection: 'row',
      background: '#889CA9',
      borderRadius: '110px',
      padding: '10px 40px',
    };

    const styleWhoUses = {
      color: '#fff',
      fontWeight: '600',
      fontSize: '24px',
      width: '150px',
    };

    const styleUsersWrapper = {
      display: 'flex',
      flexDirection: 'row',
    };

    const styleUserLink = {
      margin: '0 15px',
      display: 'flex',
      alignSelf: 'center',
    };

    const styleFeature = {
      maxWidth: '200px',
    };

    const styleFeaturesWrapper = {
      background: '#F79710',
      position: 'relative',
      display: 'flex',
      color: 'white',
      textAlign: 'center',
      justifyContent: 'center',
      padding: '100px 0 50px 0',
      fontSize: '13px',
      lineHeight: '16px',
      height: '200px',
      background: `url("${baseUrl}img/orange-background.svg")`,
    };

    const styleFeatureHeader = {
      fontWeight: 'bold',
      paddingBottom: '5px',
      fontSize: '14px',
    };

    const styleBullet = {
      padding: '10px 20px',
      height: '30px',
    };

    const styleCapibilities = {
      display: 'flex',
      flexDirection: 'row',
      fontSize: '14px',
      paddingTop: '40px',
      flexWrap: 'wrap',
    };

    const styleCapibility = {
      color: 'white',
      textAlign: 'center',
      justifyContent: 'center',
      padding: '0 30px',
      minWidth: '160px',
    };

    const styleCapibilityIcon = {
      height: '50px',
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>

        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="mainInner">
            <div className="features" style={styleFeaturesWrapper}>
              <div style={styleFeature}>
                <div style={styleFeatureHeader}>Form & Field</div>
                <div>Form & Field react components based on Form class</div>
              </div>
              <img style={styleBullet} src={`${baseUrl}img/bullet.svg`} alt="bullet" />
              <div style={styleFeature}>
                <div style={styleFeatureHeader}>Common Components</div>
                <div>React components for usage Select, TextInput and more</div>
              </div>
              <img style={styleBullet} src={`${baseUrl}img/bullet.svg`} alt="bullet" />
              <div style={styleFeature}>
                <div style={styleFeatureHeader}>Layouts</div>
                <div>Item & List react components for unified form pages</div>
              </div>
            </div>
          </div>
          <div className="user-and-highlights" style={styleBottomWrapper}>
            <div style={styleWhoUsesWrapper}>
              <div style={styleWhoUses}>Who uses Jafar?</div>
              <div style={styleUsersWrapper}>
                <a style={styleUserLink} href="https://www.verizonmedia.com/">
                  <img
                    alt="Verizon Media"
                    src={`${baseUrl}img/verizon-media.png`}
                    style={{ width: '80px', height: '40px' }} />
                </a>
              </div>
            </div>
            <div class="highlights" style={styleCapibilities}>
              <div style={styleCapibility}>
                <img style={styleCapibilityIcon} src={`${baseUrl}img/manage-complicated.svg`} alt="" />
                <div>Manage Complicated Form</div>
              </div>
              <div class="highlight" style={styleCapibility}>
                <img style={styleCapibilityIcon} src={`${baseUrl}img/form-persistency.svg`} alt="" />
                <div>Form Persistency</div>
              </div>
              <div class="highlight" style={styleCapibility}>
                <img style={styleCapibilityIcon} src={`${baseUrl}img/server-side-validation.svg`} alt="" />
                <div>Server Side Validation</div>
              </div>
              <div class="highlight" style={styleCapibility}>
                <img style={styleCapibilityIcon} src={`${baseUrl}img/grid-usage.svg`} alt="" />
                <div>Grid Usage</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Index;
