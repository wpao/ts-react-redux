# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

## run

jalankan json-server
json-server adalah db sementara yang memanpaatkan pnpm add json-server
bash berikut untuk menjalankan json-server

```bash
docker compose --profile dev up -d
```

menjalankan container

```bash
docker compose start
atau
docker container start namaContainer/containerId
```

stop container secara manual

```bash
docker compose stop
docker container stop namaContainer/containerId
```

<!-- ================ -->

perintah menggunakan docker compose

```
docker compose build
docker compose create
docker compose start
docker compose down

docker images
docker image rm namaimage/imageid

docker ps
docker container ls -a
docker container rm namacontainer/containerid

docker images
docker tag react-app:latest my-docker-repo/react-app:latest
docker push my-docker-repo/react-app:latest
docker pull my-docker-repo/react-app:latest

docker compose --profile dev up
docker compose --profile dev up -d
docker compose --profile prod up --build
```
