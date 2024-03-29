/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import { shallow } from 'enzyme';
import { Section } from '../components/Section/Section';
import SectionWithRef from '../components/Section/index';


describe('Section', () => {
  const Field = () => {};

  it('Should render simple section with ref', () => {
    const section = {
      id: 'job-information',
      boxes: [{
        direction: 'row',
        boxes: getComponentsBoxes(['firstName', 'lastName']),
      }],
    };
    const component = shallow(<SectionWithRef {...section} />);
    expect(component).toMatchSnapshot();
  });

  it('Should render section with grid', () => {
    const section = {
      id: 'job-information',
      title: 'Job Information',
      grid: getGrid([
        'firstName lastName .',
        'personalId address .',
      ]),
    };
    const component = shallow(getComponent(section));
    expect(component).toMatchSnapshot();
  });

  it('Should render simple section boxes without title', () => {
    const section = {
      id: 'job-information',
      boxes: [{
        direction: 'row',
        boxes: getComponentsBoxes(['firstName', 'lastName']),
      }],
    };
    const component = shallow(getComponent(section));
    expect(component).toMatchSnapshot();
  });

  it('Should render simple section boxes - root', () => {
    const section = {
      id: 'job-information',
      title: 'Job Information',
      boxes: [{
        direction: 'row',
        boxes: getComponentsBoxes(['firstName', 'lastName']),
      }],
    };
    const component = shallow(getComponent(section));
    expect(component).toMatchSnapshot();
  });

  it('Should render simple section boxes - not root', () => {
    const section = {
      id: 'job-information',
      title: 'Job Information',
      boxes: [{
        direction: 'row',
        boxes: getComponentsBoxes(['firstName', 'lastName']),
      }],
      root: false,
    };
    const component = shallow(getComponent(section));
    expect(component).toMatchSnapshot();
  });

  it('Should render complex section boxes', () => {
    const section = {
      id: 'job-information',
      title: 'Job Information',
      boxes: [{
        direction: 'row',
        boxes: [{
          direction: 'column',
          boxes: getComponentsBoxes(['firstName', 'lastName']),
        }, {
          direction: 'column',
          boxes: getComponentsBoxes(['address']),
        }],
      }],
    };
    const component = shallow(getComponent(section));
    expect(component).toMatchSnapshot();
  });

  it('Should render section with sub sections', () => {
    const section = {
      id: 'raw-data',
      title: 'Raw Data',
      boxes: [{
        direction: 'row',
        boxes: [{
          direction: 'column',
          boxes: getComponentsBoxes(['id', 'modifier']),
        }, {
          direction: 'column',
          boxes: getComponentsBoxes(['creationDate', 'modificationDate']),
        }],
      }],
      sections: [{
        id: 'raw-data-general',
        title: 'General',
        boxes: [{
          direction: 'row',
          boxes: [{
            direction: 'column',
            boxes: getComponentsBoxes(['id']),
          }, {
            direction: 'column',
            boxes: getComponentsBoxes(['modifier']),
          }],
        }],
      }, {
        id: 'raw-data-modification',
        title: 'Modification',
        boxes: [{
          direction: 'row',
          boxes: [{
            direction: 'column',
            boxes: getComponentsBoxes(['creationDate']),
          }, {
            direction: 'column',
            boxes: getComponentsBoxes(['modificationDate']),
          }],
        }],
      }],
    };
    const component = shallow(getComponent(section));
    expect(component).toMatchSnapshot();
  });

  it('Should render section with only sub sections with root', () => {
    const section = {
      id: 'raw-data',
      title: 'Raw Data',
      sections: [{
        id: 'raw-data-general',
        title: 'General',
        boxes: [{
          direction: 'row',
          boxes: [{
            direction: 'column',
            boxes: getComponentsBoxes(['id']),
          }, {
            direction: 'column',
            boxes: getComponentsBoxes(['modifier']),
          }],
        }],
      }, {
        id: 'raw-data-modification',
        title: 'Modification',
        boxes: [{
          direction: 'row',
          boxes: [{
            direction: 'column',
            boxes: getComponentsBoxes(['creationDate']),
          }, {
            direction: 'column',
            boxes: getComponentsBoxes(['modificationDate']),
          }],
        }],
      }],
    };
    const component = shallow(getComponent(section));
    expect(component).toMatchSnapshot();
  });

  function getComponent(section) {
    return (<Section {...section} />);
  }

  function getComponentsBoxes(fields) {
    return fields.map(id => ({ component: Field, props: { id } }));
  }

  function getGrid(templateAreas) {
    const fieldIds = templateAreas.join(' ').split(' ').filter(x => x !== '.');
    return {
      templateAreas,
      elements: fieldIds.map(id => ({ 
        selector: `#${id}`, 
        gridArea: id, 
        component: Field, 
        props: { id },
        style: 'width: 350px;',
      })),
    };
  }
});
