/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import demos from './demos';

const docs = {
  form: {
    overview: { label: 'Form Overview', href: '/docs/form-overview' },
    required: { label: 'Required', href: '/docs/required' },
    errors: { label: 'Errors', href: '/docs/errors' },
    invalid: { label: 'Invalid', href: '/docs/invalid' },
    requireTerm: { label: 'Require Term', href: '/docs/require-term' },
    validators: { label: 'Validators', href: '/docs/validators' },
    excludeTerm: { label: 'Exclude Term', href: '/docs/exclude-term' },
    disableTerm: { label: 'Disable Term', href: '/docs/disable-term' },
    dependencies: { label: 'Dependencies', href: '/docs/dependencies' },
    component: { label: 'Component', href: '/docs/component' },
    path: { label: 'Path', href: '/docs/path' },
    data: { label: 'Data', href: '/docs/data' },
    context: { label: 'Context', href: '/docs/context' },
    hooks: { label: 'Hooks', href: '/docs/hooks' },
    dependenciesChanges: { label: 'Dependencies Change', href: '/docs/dependencies-change' },
    formattersParser: { label: 'Formatter Parser', href: '/docs/formatter-parser' },
    actions: { label: 'Actions', href: '/docs/actions' },
  },
  react: {
    overview: { label: 'Overview', href: '/docs/react-overview' },
    form: {
      form: { label: 'Form', href: '/docs/react-form#form' },
      createForm: { label: 'Create Form', href: '/docs/react-form#using-createform-helper' },
      context: { label: 'Form Component Context', href: '/docs/react-form#context' },
    },
    field: {
      fieldView: { label: 'Field View', href: '/docs/react-field#field-view' },
      customFieldView: { label: 'Custom Field View', href: '/docs/react-field#custom-field-view' },
    },
  },
};

export default [{
  id: '/overview/introduction',
  label: 'Introduction',
  demo: demos.overview.Introduction,
  isLeaf: true,
}, {
  id: '/basics',
  label: 'Basics',
  items: [
    getSubItem('basics', 'basic', 'basic', 'Basic', [docs.react.overview]),
    getSubItem('basics', 'create-form', 'create-form', 'Create Form', [docs.react.form.createForm]),
    getSubItem('basics', 'path', 'path', 'Path', [docs.form.path]),
    getSubItem('basics', 'required', 'required', 'Required', [docs.form.validators, docs.form.required, docs.form.requireTerm,
      docs.form.errors, docs.form.invalid]),
    getSubItem('basics', 'async-data', 'data-async', 'Async Data', [docs.form.data]),
    getSubItem('basics', 'async-state', 'state-async', 'Async State', [docs.form.component]),
    getSubItem('basics', 'convert-data', 'convert-data', 'Convert Data', [docs.form.hooks]),
  ],
}, {
  id: '/validations',
  label: 'Validations',
  items: [
    getSubItem('validations', 'simple', 'validators', 'Simple', [docs.form.validators, docs.form.required, docs.form.requireTerm,
      docs.form.errors, docs.form.invalid, docs.form.context]),
    getSubItem('validations', 'dependencies', 'validators-dependencies', 'Field Dependencies',
      [docs.form.validators, docs.form.required, docs.form.requireTerm,
        docs.form.errors, docs.form.invalid, docs.form.dependencies]),
    getSubItem('validations', 'dynamic-args', 'validators-dynamic-args', 'Dynamic Args', [docs.form.validators,
      docs.form.errors, docs.form.invalid]),
    getSubItem('validations', 'submit', 'validators-submit', 'Submit Validator', [docs.form.validators, docs.form.required,
      docs.form.requireTerm, docs.form.errors, docs.form.invalid]),
  ],
}, {
  id: '/exclude-term',
  label: 'Exclude Term',
  items: [
    getSubItem('exclude-term', 'simple', 'exclude-term', 'Simple', [docs.form.excludeTerm]),
    getSubItem('exclude-term', 'context', 'exclude-term-context', 'App Context', [docs.form.excludeTerm, docs.form.context]),
    getSubItem('exclude-term', 'dependencies', 'exclude-term-dependencies', 'Field Dependencies',
      [docs.form.excludeTerm, docs.form.dependencies]),
  ],
}, {
  id: '/disable-term',
  label: 'Disable Term',
  items: [
    getSubItem('disable-term', 'simple', 'disable-term', 'Simple', [docs.form.disableTerm]),
    getSubItem('disable-term', 'context', 'disable-term-context', 'App Context', [docs.form.disableTerm, docs.form.context]),
    getSubItem('disable-term', 'dependencies', 'disable-term-dependencies', 'Field Dependencies',
      [docs.form.disableTerm, docs.form.dependencies]),
  ],
}, {
  id: '/require-term',
  label: 'Require Term',
  items: [
    getSubItem('require-term', 'simple', 'require-term', 'Simple', [docs.form.requireTerm]),
    getSubItem('require-term', 'context', 'require-term-context', 'App Context', [docs.form.required, docs.form.requireTerm,
      docs.form.context]),
    getSubItem('require-term', 'dependencies', 'require-term-dependencies', 'Field Dependencies',
      [docs.form.required, docs.form.dependencies]),
  ],
}, {
  id: '/formatters-parsers',
  label: 'Formatters & Parsers',
  items: [
    getSubItem('formatters-parsers', 'simple', 'formatter-parser', 'Simple',
      [docs.form.component, docs.form.formattersParser]),
    getSubItem('formatters-parsers', 'dependencies', 'formatter-parser-with-dependencies-change-value',
      'Field Dependencies', [docs.form.component, docs.form.formattersParser,
        docs.form.dependencies, docs.form.dependenciesChanges]),
  ],
}, {
  id: '/dependencies',
  label: 'Dependencies',
  items: [
    getSubItem('dependencies', 'value-update', 'dependencies-changes-updates-value', 'Updates Value',
      [docs.form.dependencies, docs.form.dependenciesChanges]),
    getSubItem('dependencies', 'internal-value-update', 'dependencies-changes-updates-internal-value',
      'Updates Internal Value', [docs.form.dependencies, docs.form.dependenciesChanges]),
    getSubItem('dependencies', 'value-state-update', 'dependencies-changes-updates-value-and-state',
      'Updates Value And State', [docs.form.dependencies, docs.form.dependenciesChanges, docs.form.component]),
    getSubItem('dependencies', 'circular', 'dependencies-changes-circular',
      'Circular Dependencies', [docs.form.dependencies, docs.form.dependenciesChanges], 2500),
  ],
}, {
  id: '/context',
  label: 'Context',
  items: [
    getSubItem('context', 'actions', 'use-context-actions', 'Actions',
      [docs.form.context, docs.react.form.context, docs.form.actions]),
    getSubItem('context', 'form', 'use-context-form', 'Form', [docs.react.form.context, docs.form.overview]),
  ],
}, {
  id: '/others',
  label: 'Others',
  items: [
    getSubItem('others', 'change-definition', 'change-form-definition', 'Change Form Definition', [docs.react.form.form]),
    getSubItem('others', 'dynamic-forms', 'dynamic-forms', 'Dynamic Forms', [docs.react.form.form]),
    getSubItem('others', 'dynamic-data', 'dynamic-data', 'Dynamic Data', [docs.react.form.form, docs.form.data]),
    getSubItem('others', 'custom-field-view', 'custom-field-view', 'Custom Field View',
      [docs.react.field.fieldView, docs.react.field.customFieldView]),
    getSubItem('others', 'grid-usage', 'grid-usage', 'Grid Usage', [docs.react.overview]),
    getSubItem('others', 'persistency', 'form-persistency', 'Form Persistency', [docs.react.overview]),
  ],
}];

function getSubItem(parent, item, folder, label, docs, demoWait = 0) {
  const name = folder.replace(/-([a-z])/g, g => g[1].toUpperCase());
  return {
    id: `/${parent}/${item}`,
    folder,
    label,
    demo: demos.react[name].demo,
    description: demos.react[name].description,
    markup: demos.react[name].markup,
    e2e: demos.react[name].e2e,
    docs,
    hideChildren: true,
    demoWait,
    items: [
      { id: `/${parent}/${item}/html`, label: 'html', hide: true },
      { id: `/${parent}/${item}/code`, label: 'code', hide: true },
    ],
  };
}
