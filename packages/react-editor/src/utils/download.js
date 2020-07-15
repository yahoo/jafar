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
};

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
        ${section.grid.templateAreas.map(x => `'${x}',`).join('\n        ')}
      ]),
    },`).join(' ')}
  ];
  `;

  folder.file('sections.js', sectionsStr);
};

const getObjectStr = (obj, x) => (obj[x] !== undefined ? `\n          ${x}: '${obj[x]}',` : '');

const getObjectFn = (obj, x) => (obj[x] ? `\n          ${x}: () => { /* TODO: ${obj[x]} */ },` : '');

const getActions = (actions) => `[${actions.map(action => {
  return '{' 
    + getObjectStr(action, 'label')
    + getObjectStr(action, 'type')
    + getObjectFn(action, 'exclude')
    + getObjectFn(action, 'disable')
    + getObjectFn(action, 'onClick')
    + '\n        }';
}).join(', ')}]`;

const getItem = (item) => '{' 
  + (item.title !== undefined ? `\n        title: '${item.title}',` : '')
  + (item.layout !== undefined ? `\n        layout: '${item.layout}',` : '')
  + (item.size !== undefined ? `\n        size: ${item.size},` : '')
  + '\n        sections,'
  + (item.mainActions ? `\n        mainActions: ${getActions(item.mainActions)},` : '')
  + (item.optionsActions ? `\n        optionsActions: ${getActions(item.optionsActions)},` : '')
  + '\n      },';

const addItemFile = (item, folder) => {
  const itemStr = `
import React from 'react';
import { FormContext, createForm } from '@jafar/react-form';
import Item from '@jafar/react-layout/Item';
import form from '../../form';
import sections from './sections';

class ItemLayout extends React.Component {
  static contextType = FormContext;

  constructor(props) {
    super(props);

    this.state = {
      item: ${getItem(item)}
    };
  }

  render = () => (<Item {...this.state.item} />);
}

export default createForm(form)(ItemLayout);
`;

  folder.file('Item.jsx', itemStr);
};

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
};

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
