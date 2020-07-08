import { Field } from '@jafar/react-form';

const getGrid = (templateAreas) => {
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
};

export default [{
  id: 'personal-information',
  title: 'Personal Information',
  grid: getGrid([
    'firstName    lastName  .',
    'personalId   address   .',
  ]),
}, {
  id: 'job-information',
  title: 'Job Information',
  grid: getGrid([
    'level       benefits    .',
    'department  benefits    .',
  ]),
}, {
  id: 'raw-data',
  title: 'Raw Data',
  grid: getGrid([
    'id         creationDate       .',
    'modifier   modificationDate   .',
  ]),
  sections: [{
    id: 'raw-data-general',
    title: 'General',
    grid: getGrid([
      'id modifier .',
    ]),
  }, {
    id: 'raw-data-modification',
    title: 'Modification',
    grid: getGrid([
      'creationDate modificationDate .',
    ]),
  }],
}];
