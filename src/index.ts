import { createDefaultBranch } from './git/default-branch/default-branch.ts';

// const updateProject = createUpdateProject({
//     switchToDefaultBranch: createSwitchToDefaultBranch({
//         defaultBranch: createDefaultBranch(),
//     }),
//     updateRepository: createUpdateRepository(),
//     installDependencies: createInstallDependencies(),
// });
// console.log(`[index.ts:9] `, await updateProject());

const defaultBranch = createDefaultBranch();

console.log(`[index.ts:18] defaultBranch()`, await defaultBranch({ folder: '../loyalty-europe-back' }));
