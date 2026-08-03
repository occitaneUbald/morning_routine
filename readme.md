# Morning routine script

Script that update all repositories for the clienteling team

## What it does

Iterate over a list of project and execute for each project :

- Checkout the default branch for the project
- Update the code to the lastest version available
- Run pnpm install if available

## How to use

Fill the file [project-list.ts](src/project-list.ts) with the list of projectList you want to update.

Run the command

```bash
pnpm start
```
