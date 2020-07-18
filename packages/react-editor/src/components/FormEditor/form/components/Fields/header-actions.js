export default ({ add, addFromLibrary, fieldsLibrary }) => {
  const headerActions = [{
    label: 'Add',
    onClick: add,
  }];
  
  if (fieldsLibrary) {
    headerActions.unshift({
      label: 'Add From Library',
      variant: 'outlined',
      onClick: addFromLibrary,
    });
  }

  return headerActions;
};
