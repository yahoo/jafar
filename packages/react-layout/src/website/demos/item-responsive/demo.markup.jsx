
/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import React from 'react';
import 'prismjs';
import 'prismjs/themes/prism.css';
import DemoMarkup from '../../components/DemoMarkup';

const demo = `import React from 'react';
import { FormContext, createForm } from '@jafar-org/react-form';
import ReactBreakpoints, { Media } from 'react-breakpoints';
import Item from '../../../components/Item';
import SaveIcon from '@material-ui/icons/Save';
import form from './form';
import sections from './sections';
import sectionsMobile from './sections-mobile';

class Demo extends React.Component {
  static contextType = FormContext;

  constructor(props) {
    super(props);

    const mainActions = [{
      label: 'Cancel',
      type: 'tertiary',
      onClick: () => console.log('Cancel', this.context.model.data), // eslint-disable-line
    }, {
      label: 'Save & Close',
      type: 'secondary',
      disable: () => this.context.model.invalid,
      onClick: () => console.log('Save & Close', this.context.model.data), // eslint-disable-line
    }, {
      label: 'Save',
      type: 'primary',
      icon: SaveIcon,
      disable: () => this.context.model.invalid,
      onClick: () => console.log('Save & Close', this.context.model.data), // eslint-disable-line
    }];

    const optionsActions = [{
      label: 'Archive',
      onClick: () => {},
    }, {
      label: 'History',
      onClick: () => {},
      exclude: () => this.context.model.data.department === 'HR',
    }, {
      label: 'Report To HR',
      onClick: () => {},
      disable: () => this.context.model.data.department === 'HR',
    }, {
      label: 'Delete',
      onClick: () => {},
    }];

    this.sizes = {
      mobile: {
        size: 320,
        item: {
          title: 'Employee',
          layout: 'mobile',
          sections: sectionsMobile,
          mainActions,
          optionsActions,
        },
      },
      desktop: {
        size: 1200,
        item: {
          title: 'Employee',
          layout: 'scroll',
          sections,
          mainActions,
          optionsActions,
        },
      },
    };
  }

  render() {
    const reactBreakpoints = {};
    Object.keys(this.sizes).forEach((key) => {
      reactBreakpoints[key] = this.sizes[key].size;
    });

    return (<Styled.ItemWrapper>
      <ReactBreakpoints breakpoints={reactBreakpoints} debounceResize={true} debounceDelay={200}>
        <Media>
          {({ currentBreakpoint }) => <Item { ...this.sizes[currentBreakpoint].item } />}
        </Media>
      </ReactBreakpoints>
    </Styled.ItemWrapper>);
  }
}

export default createForm(form)(Demo);
`;

export default function markup() {
  return (<DemoMarkup exampleName="item-responsive" data={true} sectionsMobile={true} demo={demo} />);
}
