## @jafar-org/react-components

A collection of React-based components, implementing Jafar's interface for dynamically rendered components - in this case, extending material-ui components with Jafar's interface.

Each component rendered by the Jafar Field component, implements the following interface:
- value - Any type of object - the actual data that the component represents.
- state - A JSON Object which reflects a UI Component view state. (for instance - `{ filter: ‘fa’, currPageItems: [...] }`)
- disabled - (bool) If true, component will disable any data manipulation (value stays intact).
- required - (bool) If true, field is required and must contain a valid value (regardless if its currently empty or not), and the component will indicate that a value is required using different styling.
- invalid - (bool) If true, the component will indicate that there's an error. (In terms of styling, etc. purpose, for example red border on input).
- onValueChange - Propogating value change to outside layers - this.props.onValueChange(newValue).
- onStateChange - Propogating state change to outside layers - this.props.onStateChange(newState).
