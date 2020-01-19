const permittedSites = ['facebook.com', 'instagram.com'];

export default {
  verifyPermittedSites: {
    func: ({ value }) => {
      const invalidSites = value.filter(x => !permittedSites.includes(x));
      return { valid: invalidSites.length === 0, args: { invalidSites } };
    },
    message: ({ args }) => `Some sites are not permitted: ${args.invalidSites.join(',')}`, // can also be async
  },
};
