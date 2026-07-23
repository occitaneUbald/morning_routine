import { createUpdateProject } from './feature/update-project/update-project.ts';
import { createDefaultBranch } from './git/default-branch/default-branch.ts';
import { createSwitchToDefaultBranch } from './git/switch-to-default-branch/switch-to-default-branch.ts';
import { createUpdateRepository } from './git/update-repository/update-repository.ts';
import { Result } from '@bloodyowl/boxed';

const updateProject = createUpdateProject({
    switchToDefaultBranch: createSwitchToDefaultBranch({
        defaultBranch: createDefaultBranch(),
    }),
    updateRepository: () => Result.Ok({ alreadyUpToDate: true }), //createUpdateRepository(),
    installDependencies: () => Result.Ok(''), // createInstallDependencies(),
});
const updateRepository = createUpdateRepository();
console.log(`[index.ts:16] updateProject()`, await updateRepository());
console.log(`[index.ts:9] `, updateProject());
