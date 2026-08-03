import { createCommandRunner } from './command-runner.ts';
import { createUpdateProject } from './feature/update-project/update-project.ts';
import { createDefaultBranch } from './git/default-branch/default-branch.ts';
import { createSwitchToDefaultBranch } from './git/switch-to-default-branch/switch-to-default-branch.ts';
import { createUpdateRepository } from './git/update-repository/update-repository.ts';
import { createInstallDependencies } from './pnpm/install-dependencies/install-dependencies.ts';
import { projectList } from './project-list.ts';
import { Future, Result } from '@bloodyowl/boxed';
import { resolve } from 'node:path';

const commandRunner = createCommandRunner({ dirname: resolve(import.meta.dirname, '..') });
const updateProject = createUpdateProject({
    switchToDefaultBranch: createSwitchToDefaultBranch({
        defaultBranch: createDefaultBranch({ commandRunner }),
        commandRunner,
    }),
    updateRepository: createUpdateRepository({ commandRunner }),
    installDependencies: createInstallDependencies({ commandRunner }),
});

const futures = projectList.map((project) => ({ folder: `../${project}` })).map(updateProject);

await Future.all(futures)
    .map(Result.all)
    .mapOk((results) => Object.groupBy(results, ({ status }) => status))
    .mapOk(({ success = [], error = [] }) => {
        console.table(success.concat(error));
    });
