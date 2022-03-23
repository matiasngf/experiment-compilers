# loader-structure

> The propuse of this repository is to test how to create a webpack loader.

## Basics
See [image-loader](../image-loader) for a basic example on how to.

## webpack-defaults
The base structure was created using the `@webpack-contrib/defaults` package:
```bash
npm install @webpack-contrib/defaults --save-dev
```

Add the defaults command to the package.json
```json
{
  "scripts": {
    "defaults": "webpack-defaults"
  }
}
```

And generate the project:
```bash
npm run defaults
```

## Creating an example
In my case, I created an example on how to use the lib (examples should be in the loader README but in my case it helped me experiment with the lib).

See the [./example folder](example) for more details.