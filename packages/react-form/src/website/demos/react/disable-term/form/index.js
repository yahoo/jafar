import components from './components';
import fields from './fields';
import terms from './terms';

const model = {
  id: 'disable-term',
  fields,
};

const resources = {
  components,
  terms,
};

export default { model, resources };
