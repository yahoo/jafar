/**
  * Copyright 2020, Verizon Media
  * Licensed under the terms of the MIT license. See LICENSE file in project root for terms.
  */

import { isFunction } from 'lodash';

export default function isTermTruthy(term, termsMapper, getTermsProps) {
  if (term.operator) {
    return isConditionalTermTruthy(term, termsMapper, getTermsProps);
  }

  return isLogicalTermTruthy(term, termsMapper, getTermsProps);
}

function isConditionalTermTruthy(term, termsMapper, getTermsProps) {
  return new Promise((resolve) => {
    const results = [];
    const termsPromises = [];

    term.terms.forEach((operand) => {
      const result = isTermTruthy(operand, termsMapper, getTermsProps);
      termsPromises.push(result);
    });

    Promise.all(termsPromises).then((values) => {
      results.push(...values);

      let finalResult;

      results.forEach((result) => {
        if (finalResult === undefined) {
          finalResult = result;
        } else {
          finalResult = (term.operator === 'or') ? finalResult || result : finalResult && result;
        }
      });

      finalResult = term.not ? !finalResult : finalResult;
      resolve(finalResult);
    });
  });
}

function isLogicalTermTruthy(term, termsMapper, getTermsProps) {
  return new Promise((resolve) => {
    const termFunc = termsMapper[term.name].func;
    const props = getTermsProps(term, termsMapper[term.name].defaultArgs);
    let result = termFunc(props);

    if (result === undefined || result === null) {
      result = false;
    }
    const isPromise = isFunction(result.then);

    if (!isPromise) {
      result = term.not ? !result : result;
      resolve(result);
    } else {
      result.then((res) => {
        const resultPromise = term.not ? !res : res;
        resolve(resultPromise);
      });
    }
  });
}
