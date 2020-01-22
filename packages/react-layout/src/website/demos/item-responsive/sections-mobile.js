import { Field } from '@jafar-org/react-form';

const columnStyle = {
  width: '100%',
  maxWidth: '400px',
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
      getColumn(['firstName', 'lastName', 'personalId', 'address']),
    ],
  }],
}, {
  id: 'job-information',
  title: 'Job Information',
  boxes: [{
    direction: 'row',
    boxes: [
      getColumn(['department', 'benefits', 'level']),
    ],
  }],
}];
