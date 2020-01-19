---
id: why-jafar
title: Why Jafar?
sidebar_label: Why Jafar?
---

Jafar's offers many features and advantage which are listed [here](introduction.html#highlights), that no other Form module offers in one set.

## Jafar Alternatives

When we considered Jafar's requirements as a form renderer, we initially tried to use / extend different existing modules.
Unfortunately, none of the bellow available form modules serves as a viable base per our requirements (such as the ability to define when
a field is disabled or excluded and what dependencies each field has). 

### Final Form

Final form has a similar approach of separating the javascript form from any UI implementation. 
Its downsides as suppose to Jafar are:
- It doesn't have a lifecycle built-in solution for exclude / disable a field, or defining dependencies between fields. 
It can be achieved by using the form's subscribers. With this separation - code to maintain it is repeated and longer, and might be implemented tight to a specific UI. One can't understand in a simple look what is the entire form's lifecycle without investigating the code - which makes the transition to a new UI library much harder and longer (and we all transition to newly UI libraries contently).
- It doesn't offer a set of common components and layouts to begin a simple form with.
- Writing a form with final form ends up with more code and is less strait forward than just defining a form configuration object

### Redux Form

Redux form was created and maintained by the same person who wrote [Final Form](why-jafar.html#final-form), before stopped  maintaining it and 
started the new version of [Final Form](why-jafar.html#final-form). 

Its downsides:

- Too many stale issues.
- Low number of pull requests.
- Too many forks - implies that the original repository is non-sufficient.
- Too much code to maintain and consume - 26.8kB minified and gzipped.
- Bad performance.
- No documentation about breaking changes.
- The original founder of the repository quit maintaining the module and started a new solution (final-form) that serves the same purpose.

### Formik

Formik is a react form solution. It has good documentation and easy to use.

Its downsides as suppose to Jafar are:

- Restricted to a react only implementation, meaning once replacing UI library - need to re-write all form pages.
- Not persistent - when reloading a page, form cant go back to its exact ui state as before.
- seems like Formik registers visible fields only, which is not ideal for wizards / tabs that show only part of the fields, 
so for instance, invalid fields in a hidden tab are ignored by Formik the form will remain valid although it's not.
- It doesn't offer a set of common components and layouts to begin a simple form with.

### React Admin

React Admin offers a pretty good solution for react form management pages.

Its downsides as suppose to Jafar are:

- Not UI agnostic - restricted to a react only implementation, meaning once replacing UI library - need to re-write all form pages.
- Form settings are often tight with react lifecycle - so again once replacing UI library - need to re-write all form pages. 
In addition, one cant view all form lifecycle in a single place - making it harder to maintain and to new developers o understand what's the form's
lifecycle.