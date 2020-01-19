import components from './components';
import fields from './fields';
import hooks from './hooks';

const model = {
  id: 'validators-submit',
  fields,
};

const resources = {
  components,
  hooks,
};

export default { model, resources };
