# Morning routine script

Script that update all repositories for the clienteling team

## What it does

Iterate over a list of project and execute for each project :

- Checkout the default branch for the project
- Update the code to the lastest version available
- Run pnpm install if available

## How to use

Copy the file [project-list.example.ts](src/project-list.example.ts) and name it
`project-list.ts`  
You can configure :

- the list of projects you want to update inside
- change the rootFolder that will be the reference for each project path.

Run the command

```bash
pnpm start
```
