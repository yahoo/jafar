import components from './components';
import fields from './fields';
import data from './data';
import conversions from './conversions';
import dependenciesChanges from './dependencies-changes';

const model = {
  id: 'formatter-parser-with-dependencies-change-value',
  fields,
  data,
};

const resources = {
  components,
  conversions,
  dependenciesChanges,
};

export default { model, resources };
