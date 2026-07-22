import { createUpdateProject } from './feature/update-project/update-project.ts';
import { createDefaultBranch } from './git/default-branch/default-branch.ts';
import { createSwitchToDefaultBranch } from './git/switch-to-default-branch/switch-to-default-branch.ts';
import { createUpdateRepository } from './git/update-repository/update-repository.ts';
import { createInstallDependencies } from './pnpm/install-dependencies/install-dependencies.ts';

const updateProject = createUpdateProject({
    switchToDefaultBranch: createSwitchToDefaultBranch({ defaultBranch: createDefaultBranch() }),
    updateRepository: createUpdateRepository(),
    installDependencies: createInstallDependencies(),
});
console.log(`[index.ts:9] `, updateProject());
