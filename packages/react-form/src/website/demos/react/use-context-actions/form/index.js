import components from './components';
import data from './data';
import fields from './fields';
import terms from './terms';
import hooks from './hooks';

const model = {
  id: 'use-context-actions',
  data,
  fields,
};

const resources = {
  components,
  terms,
  hooks,
};

export default { model, resources };
