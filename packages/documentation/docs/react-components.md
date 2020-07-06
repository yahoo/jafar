---
id: react-components
title: Components
sidebar_label: Components
---

Unified api components - a set of stateless / stateful components that use the same set of props, and render real components inside (for instance - TextInput ).
Components are rendered in a generic way using [FieldView](react-field.html#field-view) component render function.
These components can serve as a mapping layer between Jafar form and other internal components (such as [Material UI](https://material-ui.com/) components).
Props include a number of callbacks that notify a change, such as `onValueChange`.

## Stateless Vs Stateful Components

Using stateless components in a [Field](react-field) is recommended. It enables storing the entire form state in a specific point as part of a single json object. Afterwards, the object can be used to init jafar from the same status and resume the action without interruption. (Useful for state persistence between page refreshes, form templates, debugging and etc.)

However, you can use stateful components as well, without using `state` and `onStateChange` props, and without defining `field.component.state` and `field.component.stateChange` in a [Field](react-field) definition. In that case `field.component.state` will not be updated in the form store, but instead will need state maintenance inside the component itself. 
You can still use `field.component.state` in that case as the initial state of the component.

For more info please view [stateful component](component#stateful-component) and [stateless component](component#stateless-component)

## Props

| Name          | Type          | Description |
| ------------- |-------------| ------------|
| value | any | Data represented by the component. The Field will inject the value to the component from the `model.data` using the `field.path`, and will update the `model.data` with the new value that the `onValueChange` callback prop supplies |
| state | object | Current ui state of the component. The Field will inject the current ui state to the component from the `field.component.state`, and will update the `field.component.state` with the new state that the `onStateChange` callback prop supplies |
| disabled | boolean | If true, component indicates disabled (should disable all functionality and apply corresponding styling) |
| dirty | boolean | If true, component indicates dirty |
| empty | boolean | If true, component indicates empty |
| required | boolean | If true, component indicates required |
| invalid | boolean | If true, component indicates invalid. (For example, apply red border styling for component) |
| onValueChange | function | A function that propagates a new value to be changed in the form. Function's arg is a value or an updater function as described in [changeValue action](actions#changevalue) |
| onStateChange | function | A function that propagates a new ui state to be changed in the form. Function's arg is a state object or an updater function as described in [changeState action](actions#changestate) |

## Example

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import InternalCheckboxCollection from './internal/CheckboxCollection';

export default class CheckboxCollection extends React.Component {
  static propTypes = {
    value: PropTypes.array,
    state: PropTypes.object,
    disabled: PropTypes.bool,
    onValueChange: PropTypes.func.isRequired,
    onStateChange: PropTypes.func,
  }

  static defaultProps = {
    value: [],
    state: {
      items: [],
      search: undefined, // { value, placeholder }
    },
    disabled: false,
    invalid: false,
    onStateChange: noop,
  }

  render() {
    return (
      <InternalCheckboxCollection
        search={this.props.state.search}
        items={this.props.state.items}
        inline={this.props.state.inline}
        value={this.props.value}
        disabled={this.props.disabled}
        onCheckChange={this.onItemCheckChange}
        onSearchChange={this.onSearchFilterChange}
      />
    );
  }

  onItemCheckChange = (e, checked) => {
    // pass a new value object to the hook
    const itemValue = e.target.value;
    const newValue = [...this.props.value];
    
    if (checked) {
      newValue.push(itemValue);
    } else {
      newValue.splice(value.indexOf(itemValue), 1);
    }

    this.props.onValueChange(newValue);
  };

  onSearchFilterChange = (filter) => {
    // pass a new state object to the hook
    const newState = { 
      ...this.props.state, 
      search: { 
        ...this.props.state.search,
        value: filter
      } 
    };

    this.props.onStateChange(newState);
  }
}
```

## Our Common Components

We have a collection of common components with unified api that can be used, documented here:
[common components](https://yahoo.github.io/jafar/react-components/index.html)

For instance:
```
// import input text component
import Text from '@jafar/react-components/edit/Text'

// import text label component
import Text from '@jafar/react-components/view/Text'

```

We plan to keep `@jafar/react-component` as generic as possible. We also define all the params under state to be stringify (for example, we don't pass components or functions in the state object) - in order to keep our common components stateless to support persistency. In your project, if a custom jafar component needs a non-strigify data, you can:
  - Define a resourceId in the component state (i.e someField.component.state.resourceId = 'myExtraData').
  - Define the resource under the resources object (i.e resources.myExtraData = () => {})
  - Consume Jafar's context in the component, and get the resource from `context.resources[props.state.resourceId]`

In our common components we used [Material UI](https://material-ui.com/) as our base components. 
If your app uses [Material UI](https://material-ui.com/) along with [styled components](https://www.styled-components.com/)
like we did in our form and layout demos, you will need to wrap your app's Root component with `StylesProvider` of [Material UI](https://material-ui.com/)
in order to fix their class names collision that causing ui to break.

Example form our demos:

```javascript
import { createGenerateClassName, StylesProvider } from '@material-ui/styles';

const generateClassName = createGenerateClassName({
  productionPrefix: 'jafar-react-form-demos',
});

<StylesProvider generateClassName={generateClassName}>
  <Root />
</StylesProvider>
```