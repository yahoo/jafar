echo cicd - config token to npm
npm config set //registry.npmjs.org/:_authToken ${NPM_TOKEN}

echo cicd - publish packages to npm registry
npx lerna run publish-package