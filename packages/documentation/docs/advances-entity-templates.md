---
id: entity-templates
title: Entity Templates
sidebar_label: Entity Templates
---

Create different form page templates using the same form definition - but using different UI sections definition for each view / template. For example - for 'Video' entity you can show different layouts / fields for different users depend on their role / permissions in the system. You can associate each template to a different user role / permissions.

For react, we supply [sections](react-layout#section) component with sections definition.

Example:

```javascript
// create one form definition
import { model, resources } from './form';

// create different templates with sections definition with some field ids in each section
const videoTemplate1 = {
  id: 'template-1',
  title: 'Edit Video',
  sections: [{
    title: 'Basic Info',
    fields: ['title', 'creator', 'videoPlayer'],
  }, {
    title: 'Advances Info',
    fields: ['subtitles', 'autoPlay'],
  }],
};

const videoTemplate2 = {
  id: 'template-2',
  title: 'Video',
  sections: [{
    title: 'Basic Info',
    fields: ['title', 'videoPlayer'],
  }],
};

// link each template to a different user role, and show the user its template on load page
const roleTemplate = {
  ROLE_1: 'template-1',
  ROLE_1: 'template-2',
}
```

Potentially, you can create different templates and link them to a role in the server side.
When a user logs-in - perform a call to the server to get its form model and template that associated with its role in the system.
