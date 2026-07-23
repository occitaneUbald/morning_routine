import { createUpdateProject } from './feature/update-project/update-project.ts';
import { createDefaultBranch } from './git/default-branch/default-branch.ts';
import { createSwitchToDefaultBranch } from './git/switch-to-default-branch/switch-to-default-branch.ts';
import { createInstallDependencies } from './pnpm/install-dependencies/install-dependencies.ts';
import { Result } from '@bloodyowl/boxed';

const updateProject = createUpdateProject({
    switchToDefaultBranch: createSwitchToDefaultBranch({
        defaultBranch: createDefaultBranch(),
    }),
    updateRepository: () => Result.Ok({ alreadyUpToDate: true }), //createUpdateRepository(),
    installDependencies: createInstallDependencies(),
});
console.log(`[index.ts:9] `, updateProject());
