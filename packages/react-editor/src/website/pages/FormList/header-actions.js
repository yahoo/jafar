export default ({ resetDB, create }) => [{
  label: 'Init Mock Forms',
  onClick: resetDB,
  variant: 'outlined',
}, {
  label: 'Create',
  onClick: create,
}];
