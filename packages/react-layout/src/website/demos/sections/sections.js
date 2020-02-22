import { Field } from '@jafar/react-form';

const columnStyle = {
  width: '400px',
  maxWidth: '400px',
  margin: '0 30px 0 0',
};

function getColumn(fieldIds) {
  return {
    direction: 'column',
    style: columnStyle,
    boxes: fieldIds.map(id => ({ component: Field, props: { id } })),
  };
}

export default [{
  id: 'personal-information',
  title: 'Personal Information',
  boxes: [{
    direction: 'row',
    boxes: [
      getColumn(['firstName', 'lastName']),
      getColumn(['personalId', 'address'])],
  }],
}, {
  id: 'job-information',
  title: 'Job Information',
  boxes: [{
    direction: 'row',
    boxes: [
      getColumn(['department', 'benefits']),
      getColumn(['level'])],
  }],
}, {
  id: 'raw-data',
  title: 'Raw Data',
  boxes: [{
    direction: 'row',
    boxes: [
      getColumn(['id', 'modifier']),
      getColumn(['creationDate', 'modificationDate'])],
  }],
  sections: [{
    id: 'raw-data-general',
    title: 'General',
    boxes: [{
      direction: 'row',
      boxes: [
        getColumn(['id']),
        getColumn(['modifier'])],
    }],
  }, {
    id: 'raw-data-modification',
    title: 'Modification',
    boxes: [{
      direction: 'row',
      boxes: [
        getColumn(['creationDate']),
        getColumn(['modificationDate'])],
    }],
  }],
}];
