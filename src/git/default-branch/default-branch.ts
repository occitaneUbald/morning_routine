import { type CommandRunner, DEFAULT_COMMAND_RUNNER } from '../../command-runner.ts';
import { Future } from '@bloodyowl/boxed';

export type Dependencies = { commandRunner?: CommandRunner };

export const createDefaultBranch =
    ({ commandRunner = DEFAULT_COMMAND_RUNNER }: Dependencies = {}) =>
    ({ folder }: { folder: string }) =>
        Future.fromPromise(commandRunner('git rev-parse --abbrev-ref origin/HEAD', { cwd: folder }))
            .mapOk(({ stdout }) => stdout)
            .mapOk((branch) => branch.replace(/^origin\//, ''))
            .mapError(
                () => 'Could not find default branch for repository: try running `git remote set-head origin --auto`',
            );
