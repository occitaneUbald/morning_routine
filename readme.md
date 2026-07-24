# Morning routine script

Script that update all repositories for the clienteling team

## What it does

Iterate over a list of project and execute for each project :

- Checkout the default branch for the project
- Update the code to the lastest version available
- Run pnpm install if available

## How to use

Run the command

```bash
pnpm start
```

To configure the list of project : [project file](./src/projects.ts)
