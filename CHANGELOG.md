## Unreleased

Changes that have landed in master but are not yet released

### Form

* Fix - form gets new actions after destroy. [Issue 82](https://github.com/yahoo/jafar/issues/82)

### React Editor

* Add - fields library. [Issue 75](https://github.com/yahoo/jafar/issues/75)

### React Components

* Update selects components - support custom styles. [Issue 79](https://github.com/yahoo/jafar/issues/79)

* Add toJafar hoc util and transfer components to use it. [Issue 86](https://github.com/yahoo/jafar/issues/86)

### Documentation

* Add toJafar hoc util and how to test components. [Issue 86](https://github.com/yahoo/jafar/issues/86)

## v1.0.9 (July 15, 2020)

### React Form

* Add - parent context for form's context. [Issue 73](https://github.com/yahoo/jafar/issues/73)

### React Layout

* Add - props of 'templateColumns' and 'gap' to section grid. [Issue 73](https://github.com/yahoo/jafar/issues/73)

### React Editor

* Add - layout editor for each form. [Issue 73](https://github.com/yahoo/jafar/issues/73)

* Update - download form files - to include form's layouts. [Issue 73](https://github.com/yahoo/jafar/issues/73)

### Documentation

* Fix - path doc. [Issue 69](https://github.com/yahoo/jafar/issues/69)

## v1.0.8 (July 10, 2020)

### React Layout

* Add - size support. [Issue 67](https://github.com/yahoo/jafar/issues/67)

## v1.0.7 (July 8, 2020)

### React Layout

* Add - wizard demo. [Issue 46](https://github.com/yahoo/jafar/issues/46)

* Add - sections by grid css config. [Issue 62](https://github.com/yahoo/jafar/issues/62)

### Documentation

* Fix - demos broken links. [Issue 59](https://github.com/yahoo/jafar/issues/59)

## v1.0.6 (July 5, 2020)

### Form

* Add - support for updater function for changeState and changeValue actions

### React Editor

* Fix - edit field should render all its validators when editing saved field

## v1.0.5 (July 4, 2020)

### General

* Add license field to all packages 

### Form

* Fix - when term supplied without indicator (e.g excludeTerm and excluded), indicator first true until calculated

* Fix - remove evaluate state changes from init field - its already evaluated in 'evaluateField'

### React Layout

* Footer popover - placement in parent container instead of body

### React Editor

* Add package `react-editor` - demo website to create form configuration using a simple UI

### Documentation

* Add online form editor of `react-editor` package to the docs

## v1.0.4 (February 24, 2020)

### React Kit

* Upgrade `react-scripts` to 3.4.0

## v1.0.3 (February 23, 2020)

### General

* Upgrade Jafar dependencies to 1.0.3

## v1.0.2 (February 22, 2020)

### General

* Rename packages scope from `jafar-org` to `jafar`

### React Kit

* Fix vulnerability: "serialize-javascript": "^2.1.1"

### React Form

* Demos website - fix scroll to selected left menu item

### React Layout

* Demos website - fix scroll to selected left menu item

### React Components

* Add component - view/JsonView

## v1.0.1 (February 4, 2020)

### Form 

* Improve dependenciesChange and add test case
* Fix - when field excluded, keep required value

### React Components

* Add component edit/JsonEditor
* Add default params to multi-select and one more

### React Form

* Website demos - add download demo button

### React Layout

* Website demos - add download demo button
* Fix popover demos markup

## v1.0.0 (January 1, 2020)

### From

* Add package `@jafar/form` 

### React From

* Add package `@jafar/react-form` 

### React Components

* Add package `@jafar/react-components` 

### React Layout

* Add package `@jafar/react-layout` 
