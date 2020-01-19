import components from './components';
import fields from './fields';
import dependenciesChanges from './dependencies-changes';

const model = {
  id: 'dependencies-changes-updates-internal-value',
  fields,
};

const resources = {
  components,
  dependenciesChanges,
};

export default { model, resources };
