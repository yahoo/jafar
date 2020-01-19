---
id: react-layout
title: Layout
sidebar_label: Layout
---

Management layout react components of `Item` and `List`, to use in your app. With `List` component 
you can define a list page for any entity in your system. `Item` component is used to define editable / viewable pages,
such as - create / edit / details entities pages - that render sections. Each section render a set of dynamic components.

In the demos we use [Jafar's Form and Field](react-form.html) components, but `@jafar/react-layout` packages does not depend on [@jafar/react-form](react-form.html). Any other component can be used in the sections. A combination of both `@jafar/react-form` and `@jafar/react-layout` can create a complete solution for management pages.

> **Note:** You can create different form page templates using the same form definition - but using different [sections](react-layout#section) definition for each view / template. For example - for 'Video' entity you might want to show different layouts / fields for different users depending on their role / permissions in the system. See [entity template](entity-templates) usage.

Layout contains the following exposed components for usage:

## Item Components

### Item

React Component that render sections that contains dynamic components, as well as title, footer with actions, menu with actions
and layout.

#### Import

```javascript
import Item from '@jafar/react-layout/Item'
```

#### Props

| Name          | Type          | Description |
| ------------- |-------------| ------------|
| title | string | Text that renders at the top of the Item |
| layout | string | Represent the layout of the item. Can be one of `scroll` / `tabs` / `mobile` / undefined (default) |
| sections | required array | Array of objects. Each object can contain the data defined in [Section](react-layout#section) and [Section extend](react-layout#section-extend) |
| mainActions | array | Represent the label of the action. Its required when layout is not `mobile`. Each object can contain the data defined in [mainAction](react-layout#mainaction) |
| optionsActions | array | Represent the label of the action. Its required when layout is not `mobile`. Each object can contain the data defined in [optionAction](react-layout#optionaction) |

#### Example

```javascript
import Item from '@jafar/react-layout/Item';
import sections from './sections';

const item = {
  title: 'Employee',
  layout: 'scroll',
  sections,
  mainActions: [{
    label: 'Cancel',
    type: 'tertiary',
    onClick: () => {},
  }, {
    label: 'Save & Close',
    type: 'secondary',
    disable: () => true,
    onClick: () => {},
  }, {
    label: 'Save',
    type: 'primary',
    icon: SaveIcon,
    disable: () => true,
    onClick: () => {}
    popover: {
      title: 'Handle Fields',
      open: () => true,
      component: props => `Save alert: ${props.message}`,
      props: { 
        message: 'Please fix invalid fields',
      },
    },
  }],
  optionsActions: [{
    label: 'Archive',
    onClick: () => {},
  }, {
    label: 'History',
    onClick: () => {},
    exclude: () => false,
  }, {
    label: 'Report To HR',
    onClick: () => {},
    disable: () => false,
  }, {
    label: 'Delete',
    onClick: () => {},
  }],
};

<Item {...item} />
```

sections.js:

```javascript
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
```

#### section extend

| Name          | Type          | Description |
| ------------- |-------------| ------------|
| exclude | function | Callback function that is evaluated on render and should return `true` if currently the section should be excluded |

#### mainAction

| Name          | Type          | Description |
| ------------- |-------------| ------------|
| label | string | Represent the label of the action. Its required when layout is not `mobile` |
| icon | function | React component that renders svg icon. Its required when layout is `mobile` |
| type | string | Represent the type of the action. Can be one of `primary` (default) / `secondary` / `tertiary` |
| onClick | function | Callback function that is called when user triggers the action |
| disable | function | Callback function that is evaluated on render and should return `true` if currently the action should be disabled |
| exclude | function | Callback function that is evaluated on render and should return `true` if currently the action should be excluded |
| popover | object | Represent popover that appears above the action. Relevant for non `mobile` layouts. Contains data defined in [popover](#popover) |

#### optionAction

| Name          | Type          | Description |
| ------------- |-------------| ------------|
| label | required string | Represent the label of the action |
| onClick | function | Callback function that is called when user triggers the action |
| disable | function | Callback function that is evaluated on render and should return `true` if currently the action should be disabled |
| exclude | function | Callback function that is evaluated on render and should return `true` if currently the action should be excluded |

#### popover

| Name          | Type          | Description |
| ------------- |-------------| ------------|
| title | string | Represent the title of the popover |
| open | function | Callback function that is evaluated on render and should return `true` if currently the popover should be open |
| component | function | React component to be rendered in the popover body |
| props | object | Props object to be passes to the body's component |


### Section

React Component that renders title and composition of components. Each section can contain sub sections as well.

#### Import

```javascript
import Item from '@jafar/react-layout/Section'
```

#### Props

| Name          | Type          | Description |
| ------------- |-------------| ------------|
| id | required string | Id of the section |
| title | string | Title the section |
| boxes | object array | Each object can contain the data defined in [Box](react-layout.html#box) |
| sections | object array | Sub sections, each object can contain the data defined in [Section](react-layout.html#sections) |

### Box

Box can be either flex box (by defining direction, boxes, style) 
or a dynamic component (by defining `component` and `props` props).

#### Import

```javascript
import Item from '@jafar/react-layout/Box'
```

#### Props

| Name          | Type          | Description |
| ------------- |-------------| ------------|
| direction | string | Represent the flex direction of the box. Can be one of `row`, `column` (default) |
| boxes | object | Style object to be passed to the box |
| component | function | Dynamic react component to render in the box |
| props | object | Props to pass to the rendered component |

## List Components

`TBD` - React Component that render grid and filters components.
