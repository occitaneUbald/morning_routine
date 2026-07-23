import { type CommandRunner, DEFAULT_COMMAND_RUNNER } from '../../command-runner.ts';
import { Future } from '@bloodyowl/boxed';

export type Dependencies = {
    commandRunner?: CommandRunner;
};

export const createInstallDependencies =
    ({ commandRunner = DEFAULT_COMMAND_RUNNER }: Dependencies = {}) =>
    ({ folder }: { folder: string }) =>
        Future.fromPromise(commandRunner('pnpm install --frozen-lockfile', { cwd: folder })).mapError(
            () => 'Could not install dependencies',
        );
