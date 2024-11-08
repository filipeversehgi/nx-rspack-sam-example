# NxLambda

> ### :warning: ATTENTION :warning:
> 
> Use the branch `feat/npm-faulty-dist` to check the issue with `@module-federation/sdk` build duplicated package.json

This project aims to use NX, AWS SAM Lambdas, Module Federation and NestJs together.

This setup contains, for now:

- 🚀 NX Monorepo
- 🛡️ NestJS API on Serverless Module
    - This API consumes a simple federated package called random-name
- 🌀 Simple Lambda
    - This lambda also consumes the federated package called random-name

### Steps to Run

1. Install the packages and apply the patches

> The command `patch-package` will remove a faulty `node_modules/@module-federation/sdk/dist/package.json` that causes the Node MF import to malfunction. By removing it, the runtime properly uses the correct file that is `node_modules/@module-federation/sdk/package.json`.

```bash
yarn install
```

2. Serve the Federated Module

```bash
yarn nx serve random-name --verbose
```

3. In another terminal tab, build the Lambda Test or the NestJs API Test

```bash
# For the Lambda Test
yarn nx build lambda-hello --skip-nx-cache
node --experimental-network-imports dist/apps/lambda-hello/main.js

# For NestJs API
yarn nx build my-nest-app --skip-nx-cache
node --experimental-network-imports dist/apps/my-nest-app/main.js
```

## Lessons so Far

For lambda to work with webpack outputs, you need to add those two lines to `webpack.config.ts#output` section:

```js
module.exports = {
  output: {
    ///...
    libraryTarget: 'commonjs2',
    iife: false,
  }
}
```

To run those functions using AWS SAM, you need to:

1. Update the webpack.config.ts module federation config on the HOSTS to fetch the remotes from a public https URL instead of localhost. This happens due the fact that SAM uses docker and the localhost for the docker instance is the instance itself, not your machine. (Suggestion: use Ngrok and run `ngrok http http://localhost:3001`), then get the URL and update the config.

2. Run those commands, after
```bash
yarn nx build my-nest-app --skip-nx-cache
# or: yarn nx build lambda-hello --skip-nx-cache

yarn sam:build:api
# or: yarn sam:build:hello

cp -r node_modules/ .aws-sam/build/MyFunctionNameFunction/

sam local start-api
```
