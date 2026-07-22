import { createUpdateProject } from './feature/update-project/update-project.ts';
import { createSwitchToDefaultBranch } from './git/switch-to-default-branch/switch-to-default-branch.ts';
import { createUpdateRepository } from './git/update-repository/update-repository.ts';
import { createInstallDependencies } from './pnpm/install-dependencies/install-dependencies.ts';
import { Result } from '@bloodyowl/boxed';

const updateProject = createUpdateProject({
    switchToDefaultBranch: createSwitchToDefaultBranch({
        defaultBranch: () => Result.Ok('') /* createDefaultBranch() */,
    }),
    updateRepository: createUpdateRepository(),
    installDependencies: createInstallDependencies(),
});
console.log(`[index.ts:9] `, updateProject());
