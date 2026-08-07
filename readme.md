# Morning routine script

Script that update all repositories for the clienteling team

## What it does

Iterate over a list of project and execute for each project :

- Checkout the default branch for the project
- Update the code to the lastest version available
- Run pnpm install if available

## How to use

Copy the file [project-list.example.ts](src/project-list.ts) to `project-list.ts` with the list of projects you want to update.
You can change the rootFolder that will be the reference for each project path.

Run the command

```bash
pnpm start
```
