# NxLambda

This project aims to use NX, AWS SAM Lambdas, Module Federation and NestJs together.

### Steps to Run

1. Install the packages

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

Then, you will see that an error is presented, where module-federation/sdk cannot be found on `dist/dist` path.

4. Patch the SDK Module Federation Folder

```bash
cp -R node_modules/@module-federation/sdk/dist/ node_modules/@module-federation/sdk/dist-2
mv node_modules/@module-federation/sdk/dist-2 node_modules/@module-federation/sdk/dist/dist
```

5. Run again the `node` commands. You will see everything works.

I just don't know why D: