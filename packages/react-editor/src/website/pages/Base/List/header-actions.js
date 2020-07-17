export default ({ create }, headerActions = []) => [{
  label: 'Create',
  onClick: create,
},
...headerActions];
