---
id: grid-usage
title: Grid Usage
sidebar_label: Grid Usage
---

Use Jafar UI Form and Field components in each row of a grid - allowing each row to be both viewable and editable easily, by implementing each cell in a row as a Field component and wrap each row with Form component that gets the current row data as the form's data.

React Example:

```javascript
import { model, resources } from './form';

const employees = [{
  id: '10501',
  firstName: 'Rachel',
  lastName: 'Green',
  facebookUrl: 'https://www.facebook.com/Rachel-Green-1153494548070426/',
  address: '90 Bedford Street'
}, {
  id: '10502',
  firstName: 'Ross',
  facebookUrl: 'https://www.facebook.com/Ross-Geller-22819855829/?ref=br_rs',
  lastName: 'Geller',
  address: 'Above some naked man'
}, {
  id: '10503',
  firstName: 'Monica',
  lastName: 'Geller',
  facebookUrl: 'https://www.facebook.com/MonicaGellerBing1969/',
  address: '90 Bedford Street'
}];

// render 
return (
  <Grid container={true}>
    <Grid container={true} item={true} xs={12} style={headerStyle}>
      <Grid item={true} xs={1}>Id</Grid>
      <Grid item={true} xs={2}>First Name</Grid>
      <Grid item={true} xs={2}>Last Name</Grid>
      <Grid item={true} xs={4}>Facebook Url</Grid>
    </Grid>
    {
      employees.map(employee => {
      // apply current employee to the row's form model as the form's data
      const overrides = { id: `${model.id}-${employee.id}`, data: employee };
      const rowModel = Object.assign({}, model, overrides);

      return (
        <Grid container={true} item={true} xs={12} key={employee.id}>
          <Form model={rowModel} resources={resources}>
            <Grid item={true} xs={1}>
              <Field id="id" />
            </Grid>
            <Grid item={true} xs={2}>
              <Field id="firstName" />
            </Grid>
            <Grid item={true} xs={2}>
              <Field id="lastName" />
            </Grid>
            <Grid item={true} xs={4}>
              <Field id="facebookUrl" />
            </Grid>
          </Form>
        </Grid>);
      })
    }
  </Grid>);
```

See advanced demo in [Grid Demo](https://yahoo.github.io/jafar/demo-react-form.html#/others/grid-usage/html).