echo cicd - set github config
git config --global user.email 'travis@travis-ci.org'
git config --global user.name 'Travis CI'

echo cicd - Initiating connection to GitHub
git remote set-url origin https://$GITHUB_TOKEN@github.com/yahoo/jafar.git

echo cicd - deploy website to gh-pages
git fetch
npx lerna run deploy-website