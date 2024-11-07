# NxLambda

This project aims to use NX, AWS SAM Lambdas, Module Federation and NestJs together.

This setup contains, for now:

- NX Monorepo
- NestJS API on Serverless Module
    - This API consumes a simple federated package called random-name
- Simple Lambda
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