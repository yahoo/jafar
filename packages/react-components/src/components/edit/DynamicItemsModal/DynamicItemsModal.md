<h3>Examples</h3>

<h4>Simple</h4>

```javascript
const useContext = require('react').useState;
const createContext = require('react').createContext;
const JafarContext = require('@jafar/react-form/context').default;
const InputText = require('../Text').default;
const Form = require('@jafar/react-form/Form').default;
const Field = require('@jafar/react-form/Field').default;

// jafar form definition
const employeeForm = {
  model: {
    id: 'employees',
      fields: { 
        firstName: {
          label: 'First name',
          path: 'firstName',
          component: {
              name: 'InputText',
          },
          required: true,
        },
        lastName: {
          label: 'Last name',
          path: 'lastName',
          component: {
              name: 'InputText',
          },
          required: true,
        },
      },
  },
  resources: {
    components: { 
      InputText: {
        renderer: InputText,
      } 
    },
  }
};

// jafar-layout item
const employeeFormLayout = { 
  size: 1,
  sections: [{ 
      id: 'AddEmployee', 
      boxes: [{
          direction: 'column',
          style: { 'margin': '20px' },
          boxes: [{
              component: Field,
              props: { id: 'firstName' },
          }, {
              component: Field,
              props: { id: 'lastName' },
          }],
      }],
  }],
}

// render single item
const employeeItemRendered = (item) => (<span>{item.firstName} {item.lastName}</span>);

// main form
const model = {
  id: 'company',
  fields: {
    employees: {
      label: 'Employees',
      path: 'employees',
      component: {
        name: 'DynamicItemsModal',
        state: {
          resourceId: 'employeesData',
        },
      },
      required: true,
    },
  },
  data: {
    employees: [{
      firstName: 'Rachel',
      lastName: 'Green',
    }, {
      firstName: 'Ross',
      lastName: 'Geller',
    }]
  },
};

const resources = {
  components: { 
    DynamicItemsModal: {
      renderer: DynamicItemsModal,
    },
  },
  employeesData: { // custom data
      form: employeeForm,
      item: employeeFormLayout,
      itemRenderer: employeeItemRendered,
  },
};

<div style={{ width: '400px' }}>
  <Form model={model} resources={resources}>
    <Field id='employees' />
  </Form>
</div>
  ```
<h4>Advanced</h4>

```javascript
const useContext = require('react').useState;
const createContext = require('react').createContext;
const JafarContext = require('@jafar/react-form/context').default;
const InputText = require('../Text').default;
const Select = require('../Select').default;
const Form = require('@jafar/react-form/Form').default;
const Field = require('@jafar/react-form/Field').default;

const selectItems = {
  M: { value: 'M', label: 'Male'},
  F: { value: 'F', label: 'Female'},
};
// jafar form 
const employeeForm = {
  model: {
    id: 'employees',
    fields: { 
      firstName: {
        label: 'First name',
        path: 'firstName',
        component: {
            name: 'InputText',
        },
        required: true,
      },
      lastName: {
        label: 'Last name',
        path: 'lastName',
        component: {
            name: 'InputText',
        },
        required: true,
      },
      gender: {
        label: 'Gender',
        path: 'gender',
        component: {
          name: 'Select',
          state: {
            items: Object.values(selectItems),
          },
        },
      },
      address: {
        label: 'Address',
        path: 'address',
        component: {
            name: 'InputText',
        },
        required: true,
      },
    },
    data: { gender: 'F' },
  },
  resources: {
    components: { 
      InputText: {
        renderer: InputText,
      }, 
      Select: {
        renderer: Select,
      }
    },
  },
};

// jafar-layout item
const employeeFormLayout = {
  size: 1,
  sections: [{ 
      id: 'basic', 
      title: 'Basic',
      boxes: [{
          direction: 'column',
          boxes: [{
              component: Field,
              props: { id: 'firstName' },
          }, {
              component: Field,
              props: { id: 'lastName' },
          }, {
              component: Field,
              props: { id: 'gender' },
          }],
      }],
  }, { 
      id: 'more', 
      title: 'More',
      boxes: [{
          direction: 'column',
          boxes: [{
              component: Field,
              props: { id: 'address' },
          }],
      }],
  }],
};

const employeeItemRenderer = item => (<div>
  <div>{item.firstName} {item.lastName}</div>
  <div style={{ paddingLeft: '20px' }}>
    <div>👤 {selectItems[item.gender].label}</div>
    <div>🏠 {item.address}</div>
  </div> 
</div>);

// main form
const model = {
  id: 'company',
  fields: {
    employees: {
      label: 'Employees',
      path: 'employees',
      component: {
        name: 'DynamicItemsModal',
        state: {
            resourceId: 'employeesItems',
            addButtonLabel: 'Add New',
            addModalTitle: 'Add employee',
            editModalTitle: 'Edit employee',
            saveButtonLabel: 'Save',
            cancelButtonLabel: 'Cancel',
        },
      },
    },
  },
  data: {
    employees: [{
      firstName: 'Rachel',
      lastName: 'Green',
      gender: 'F',
      address: '90 Bedford St, New York, NY 10014, USA',
    }, {
      firstName: 'Ross',
      lastName: 'Geller',
      gender: 'M',
      address: '90 Bedford Street',
    }]
  },
};

const resources = {
  components: { 
    DynamicItemsModal: {
      renderer: DynamicItemsModal,
    },
  },
  employeesItems: {
    form: employeeForm,
    item: employeeFormLayout,
    itemRenderer: employeeItemRenderer,
  },
};

<div style={{ width: '600px' }}>
  <Form model={model} resources={resources}>
    <Field id='employees' />
  </Form>
</div>
  ```
