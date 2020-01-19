import components from './components';
import fields from './fields';
import data from './data';
import dependenciesChanges from './dependencies-changes';

const model = {
  id: 'dependencies-changes-circular',
  fields,
  data,
};

const resources = {
  components,
  dependenciesChanges,
};

export default { model, resources };
