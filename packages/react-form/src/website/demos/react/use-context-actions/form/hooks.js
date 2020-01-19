export default {
  submit: ({ data }) => { // sync / async function
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('submitting', data); // eslint-disable-line
        resolve();
      }, 1);
    });
  },
};
