import { createCommandRunner } from './command-runner.ts';
import { createUpdateProject } from './feature/update-project/update-project.ts';
import { createUpdateProjects } from './feature/update-projects/update-projects.ts';
import { createDefaultBranch } from './git/default-branch/default-branch.ts';
import { createSwitchToDefaultBranch } from './git/switch-to-default-branch/switch-to-default-branch.ts';
import { createUpdateRepository } from './git/update-repository/update-repository.ts';
import { createInstallDependencies } from './pnpm/install-dependencies/install-dependencies.ts';
import { projectList, rootFolder } from './project-list.ts';

const commandRunner = createCommandRunner();
const updateProject = createUpdateProject({
    switchToDefaultBranch: createSwitchToDefaultBranch({
        defaultBranch: createDefaultBranch({ commandRunner }),
        commandRunner,
    }),
    updateRepository: createUpdateRepository({ commandRunner }),
    installDependencies: createInstallDependencies({ commandRunner }),
});

const updateProjects = createUpdateProjects({ updateProject, logger: console });

await updateProjects({ projects: projectList, rootDirectory: rootFolder });
