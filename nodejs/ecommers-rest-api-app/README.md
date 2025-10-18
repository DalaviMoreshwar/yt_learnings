# YouTube Learnings.

## NodeJS

### <span style="color: #9c9c9c"><u>nodejs: 01.</u></span> [Build Scalable REST API with Node Js](https://youtu.be/RDM-nk5f4SE)

### Learning goals:

- Setup a new **NodeJs** Project with **typescript**
- ExpressJs: Routes, Controllers, Middlewares
- Build a REST API for e-commers with Products & Orders CRUD
- User Authentication & Autherisation
- **Drizzel ORM** with postgres Database
- Request validation and error handling
- Deploy to production on **Genezio**

### Tech Stacks:

<p align="center" style="margin: 1rem" width="100%" style="background-size: cover;">
  <img width="25%" src="./../../public/imgs/image.png" alt="logo"/>
  <img width="25%" src="./../../public/imgs/image-1.png" alt="logo"/>
  <img width="25%" src="./../../public/imgs/image-2.png" alt="logo"/>
  <img width="25%" src="./../../public/imgs/image-3.png" alt="logo"/>
  <img width="25%" src="./../../public/imgs/zod.png" />
</p>

<p align="center" style="margin: 1rem">
<img width="40%" src="./../../public/imgs/image-4.png" alt="logo"/>
  <img width="40%" src="./../../public/imgs/image-5.png" alt="logo"/>
</p>

### Install Dependancies:

Express:

```bash
npm install express
```

TypeScript and Express Types:

```bash
npm install -D typescript tsx @types/express
```

TS config file:

```json
{
  "compilerOptions": {
    "module": "esnext", // use ESNEXT for ESM
    "target": "es2020", // target moden ECMAScript versions
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "outDir": "./dist", // output directory of compiled files
    "strict": true, // enable strict type chaking options
    "skipLibCheck": true, //skip type chaking of declaration files
    "resolveJsonModule": true, // include json imports
    "forceConsistentCasingInFileNames": true,
    "noEmit": false, // allow emitting output
    "isolatedModules": true, // required for using ESM modules
    "baseUrl": ".", // allow absolute imports relative to project root
    "paths": {
      "*": ["node-modules/*"]
    }
  }
}
```

Config `package.json` run command:

```json
{
+   "type": "module",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
+    "dev": "node --import=tsx --watch ./src/index.ts"
  },
}
```

**Note:** _NodeJs_ by default provides these features, we don't need to install `nodemon` etc.
