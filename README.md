# Netflix GPT 🎥🤖

**Netflix GPT** is a Netflix clone that uses AI to provide personalized movie recommendations. Users can search for movies and get suggestions powered by GPT.

This project is based on a boilerplate by [ascii-16](https://github.com/ascii-16/react-query-zustand-ts-vite-boilerplate) and was inspired by [Akshay Saini](https://github.com/akshaymarch7). It uses modern tools like **React**, **React Query**, **Zustand**, **TypeScript**, and **Vite** for a fast and smooth experience. Additionally, it features **i18n** for localization, **Firebase Authentication**, and **DaisyUI** for a Tailwind-based UI design.

## 🚀 Tech Stack

![My Tech Stack](https://github-readme-tech-stack.vercel.app/api/cards?align=center&titleAlign=center&lineCount=4&theme=github_dark&hideTitle=true&line1=react,react,61DAFB;react+query,react+query,FF4500;zustand,zustand,64D5CA;&line2=axios,axios,4183C4;typescript,typescript,3178C6;vite,vite,646CFF;&line3=eslint,eslint,4B32C3;prettier,prettier,F7B93E;Firebase,firebase,FFCA28;&line4=I18next,i18next,26A69A;DaisyUI,daisy+ui,4DC0B5;groq,groq,FFB800)

## 💡 Features

- 🎯 AI-powered movie recommendations using **GROQ AI**  
- 🌎 Multi-language support via **i18next**
- 🔒 Secure authentication using **Firebase**
- ⚡ Super-fast builds and optimizations with **Vite**
- 💻 Elegant UI and state management using **Zustand** and **DaisyUI** 
- 🔐 Type safety with **TypeScript** 


## 💻 Required Versions

| Tool        | Version    |
| ----------- | ---------- |
| NodeJS      | >=16       |
| TypeScript  | >=4.9.4    |

## 📋 Getting Started

### Clone the repository

```
git clone https://github.com/XindiShang/netflix-gpt.git
cd netflix-gpt
```

### Install dependencies

```
pnpm install
```

### Running the app

```
pnpm run dev
```

## 🛠️ Scripts

| Command       | Description                                                                  |
| ------------- | -----------------------------------------------------------------------------|
| `start`       | Run `build:css` then watch TailwindCSS and Vite concurrently                 |
| `watch:css`   | Watch for changes in `index.css` and output to `styles.css` using TailwindCSS|
| `build:css`   | Build CSS using TailwindCSS from `index.css` to `styles.css`                 |
| `build`       | Run TypeScript compiler, build CSS and then Vite build                       |
| `preview`     | Run Vite preview                                                             |
| `lint`        | Lint TypeScript files using ESLint                                           |
| `lint:fix`    | Fix linting issues in TypeScript files using ESLint                          |
| `format`      | Format `.ts`, `.tsx`, and `.json` files using Prettier                       |
| `test`        | Run Jest tests                                                               |
| `release`     | Run `standard-version` for versioning                                        |
| `commit`      | Use `git-cz` for commits                                                     |
| `prepare`     | Set up Husky for git hooks in a production environment                       |


## 🌲 Project Structure

```
├── public
└── src
  ├── components
  ├── pages
  ├── services
  ├── store
  └── types
  ├── routes
  ├── lib
  ├── i18n
```

| Folder      | Description                                                                                          |
|-------------|------------------------------------------------------------------------------------------------------|
| **`src/`**   | Contains the main source code for the application.                                                   |
| `components`| Reusable React components, each handling a specific piece of the UI.                                  |
| `lib`       | Miscellaneous utility functions, helpers, and other standalone pieces of logic.                          |
| `pages`     | Components representing full pages in the application, typically corresponding to routes.                |
| `routes`    | Configuration and components related to routing in the application.                                     |
| `services`  | Functions or classes that handle tasks like API calls, data processing, or other "service"-like tasks.    |
| `store`     | Zustand stores for state management.                                                                  |
| `i18n`      | Internationalization and localization configuration and utilities.                                     |
| **`public/`**| Contains static assets like images, fonts, and the entry HTML file. Assets in this directory are served directly and are not processed by bundlers like Vite. |

## 🤝 Contribution

If you'd like to contribute to this boilerplate, feel free to fork and send a PR. All contributions are welcome!

## 📝 License

[MIT](https://choosealicense.com/licenses/mit/)
