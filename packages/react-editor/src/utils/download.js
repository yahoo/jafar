import JSZip from 'jszip';

const addFormFolder = (rootFolder, form) => {
  // add form folder
  const formFolder = rootFolder.folder('form');

  let formIndex = `import fields from './fields';\n`;
  const formIndexModelImports = ['fields'];

  // add fields folder
  const fieldsFolder = formFolder.folder('fields');
  let fieldsIndex = '';
  const fieldIds = Object.keys(form.model.fields);
  fieldIds.forEach(fieldId => {
    fieldsFolder.file(`${fieldId}.json`, JSON.stringify(form.model.fields[fieldId]));
    fieldsIndex += `import ${fieldId} from './${fieldId}.json';\n`;
  });
  fieldsIndex += `\n\nexport default { ${ fieldIds.join(', ') } }`;
  fieldsFolder.file('index.js', fieldsIndex);

  // add data file
  if (form.model.data) {
    formFolder.file('data.json', JSON.stringify(form.model.data));
    formIndex += `import data from './data.json';\n`;
    formIndexModelImports.push('data');
  }

  // add settings file
  if (form.settings) {
    formFolder.file('settings.json', JSON.stringify(form.settings));
    formIndex += `import settings from './settings.json';\n`;
  }

  // add index file
  formIndex += `\nexport default { model: { id: '${form.model.id}', ${formIndexModelImports.join(', ')} }${ form.settings ? 
    ', settings' : '' } }`;
  formFolder.file('index.js', formIndex);
}

const addSectionsFile = (sections, folder) => {
  const sectionsStr = 
  `import { Field } from '@jafar/react-form';
  
  const getGrid = (templateAreas) => {
    let fieldIds = templateAreas.join(' ').split(' ').filter(x => x !== '.');
    fieldIds = [...(new Set(fieldIds))];
  
    return {
      templateAreas,
      elements: fieldIds.map(id => ({ 
        selector: '#' + id, 
        gridArea: id, 
        component: Field, 
        props: { id },
      })),
    };
  };
  
  export default [
    ${sections.map(section => `{
      id: '${section.id}',
      ${section.title ? `title: '${section.title}',` : ''}
      grid: getGrid([
        ${section.grid.templateAreas.map(x => `'${x}',`).join('\n      ')}
      ]),
    },`).join(' ')}
  ];
  `;

  folder.file('sections.js', sectionsStr);
}

const addItemFile = (item, folder) => {
  const itemStr = `
import React from 'react';
import { FormContext, createForm } from '@jafar/react-form';
import { iterateSections, getSectionComponentBoxes } from '@jafar/react-layout/Section/utils';
import { iterateBoxes } from '@jafar/react-layout/Box/utils';
import SaveIcon from '@material-ui/icons/Save';
import Item from '@jafar/react-layout/Item';
import FormErrors from '@jafar/react-components/view/FormErrors';
import form from './form';
import sections from './sections';

class Demo extends React.Component {
  static contextType = FormContext;

  constructor(props) {
    super(props);

    // apply exclude condition to sections - exclude section if all of its fields are excluded
    iterateSections(sections, this.applySectionsExclude);

    this.state = {
      item: {
        title: 'Employee',
        layout: 'scroll',
        size: 4,
        sections,
        mainActions: [{
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
          popover: {
            title: 'Handle Fields',
            open: () => this.context.model.invalid,
            component: FormErrors,
            props: { 
              onClickField: this.onClickField,
            },
          },
        }],
        optionsActions: [{
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
        }],
      },
    };
  }

  render() {
    return (<Item {...this.state.item} />);
  }

  onClickField = (fieldId) => {
    this.setState({
      item: {
        ...this.state.item,
        selected: { sectionId: this.getSectionId(fieldId), elementId: fieldId },
      },
    });
  }

  getSectionId = (fieldId) => {
    let sectionId;

    iterateSections(sections, (section) => {
      iterateBoxes(section.boxes, (box) => {
        if (box.props && box.props.id === fieldId) {
          sectionId = section.id;
        }
      });
    });

    return sectionId;
  }

  applySectionsExclude = (section) => {
    section.exclude = () => {
      const boxes = getSectionComponentBoxes(section);
      const fieldIds = boxes.map(box => box.props.id);
      const excluded = !fieldIds.find(fieldId => !this.context.model.fields[fieldId].excluded);
      return excluded;
    };
  }
}

export default createForm(form)(Demo);
  `;

  folder.file('Item.jsx', itemStr);
}

const addLayoutsFolder = (rootFolder, layouts) => {
  if (!layouts) return;

  // add layouts folder
  const layoutsFolder = rootFolder.folder('layouts');

  // add each layout folder
  layouts.forEach(layout => {
    // create layout folder
    const layoutFolder = layoutsFolder.folder(layout.name);

    // add sections file
    addSectionsFile(layout.item.sections, layoutFolder);

    // add item file
    addItemFile(layout.item, layoutFolder);
  });
}

export const downloadFormFiles = (form) => {
  const rootFolder = new JSZip();
  
  addFormFolder(rootFolder, form);
  addLayoutsFolder(rootFolder, form.layouts);

  rootFolder.generateAsync({ type:'blob' }).then((content) => {
    const href = window.URL.createObjectURL(content);
    const link = document.createElement('a');
    link.setAttribute('href', href);
    link.setAttribute('download', `${form.model.id}.zip`);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};

export const downloadJson = (exportObj, exportName) => {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', exportName + '.json');
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};
