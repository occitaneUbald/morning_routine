import { createUpdateProject } from './feature/update-project/update-project.ts';
import { createDefaultBranch } from './git/default-branch/default-branch.ts';
import { createUpdateRepository } from './git/update-repository/update-repository.ts';

const updateProject = createUpdateProject({
    switchToDefaultBranch: createDefaultBranch(),
    updateRepository: createUpdateRepository(),
});
updateProject();
