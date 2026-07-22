import { createUpdateProject } from './feature/update-project/update-project.ts';
import { createUpdateRepository } from './git/update-repository/update-repository.ts';
import { createInstallDependencies } from './pnpm/install-dependencies/install-dependencies.ts';
import { Result } from '@bloodyowl/boxed';

const updateProject = createUpdateProject({
    switchToDefaultBranch: () => Result.Ok(''),
    //     createSwitchToDefaultBranch({
    //     defaultBranch: () => createDefaultBranch(),
    // }),
    updateRepository: createUpdateRepository(),
    installDependencies: createInstallDependencies(),
});
console.log(`[index.ts:9] `, updateProject());
