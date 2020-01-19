import components from './components';
import fields from './fields';
import data from './data';
import validators from './validators';

const model = {
  id: 'validators-dynamic-args',
  fields,
  data,
};

const resources = {
  components,
  validators,
};

export default { model, resources };
