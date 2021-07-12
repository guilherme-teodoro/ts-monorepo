# TS Monorepo

Based on https://github.com/NiGhTTraX/ts-monorepo/

Template project for setting up a TypeScript monorepo

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Features

> The main focus of this repo is making the **`Go to definition`** feature in IDEs work without any surprises, meaning it will work after a fresh clone without needing to build the project.

![find-usage](./media/find-usage.gif)

> The secondary focus is to remove surprises when **publishing** packages. The repo is set up so that each package gets a clean build output without any artifacts from other packages.

![build-output](./media/build-output.png)

## Setup

```
yarn install
```

## Examples

This repo contains full examples of integrating with other tools and frameworks that need to be made aware that they're working with a monorepo. You can find each example in the `examples/` folder.

### jest

If you use `Babel` then see [this example](examples/jest-babel) from the [Babel](#babel) section above.

If you use [ts-jest](https://github.com/kulshekhar/ts-jest) then you can use its `pathsToModuleNameMapper` helper:

```js
const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('../../tsconfig.json')

module.exports = {
  preset: 'ts-jest',

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    // This has to match the baseUrl defined in tsconfig.json.
    prefix: '<rootDir>/../../',
  }),
}
```

See the full example [here](examples/jest-tsjest).

### NextJS

Extend Next's webpack config to enable compiling packages from the monorepo:

```js
module.exports = {
  webpack: (config) => {
    // Let Babel compile outside of src/.
    const tsRule = config.module.rules.find(
      (rule) => rule.test && rule.test.toString().includes('tsx|ts')
    )
    tsRule.include = undefined
    tsRule.exclude = /node_modules/

    return config
  },
}
```

See the full example [here](examples/nextjs).
