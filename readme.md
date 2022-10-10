# SPA with DDD approach

Sometimes your single page application contains a huge amount of business logic.
This project will show you how to deal with it.

## Project structure

- app - classic React application with set of contracts (interfaces);
- domains - pure business logic of application (implementation of use cases);
- infrastructure - environment specific services.

## TODO

1. Use @reduxjs/toolkit instead of regular redux;
2. Use ts-loader for typescript bundling;
3. Use React Fast Refresh for HMR instead of React Hot Loader;
4. Add to eslint configuration more strict rules;
5. Move some specific values to .env;
6. Add translations for application;
7. Split application to chunks;
8. Write unit tests for domains;
9. Write more domains;
10. Make the border between application and infrastructure more strict (add more contracts).
