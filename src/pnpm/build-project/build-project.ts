import { type CommandRunner, DEFAULT_COMMAND_RUNNER } from '../../command-runner.ts';
import { Future } from '@bloodyowl/boxed';

export type Dependencies = {
    commandRunner?: CommandRunner;
};

export const createBuildProject =
    ({ commandRunner = DEFAULT_COMMAND_RUNNER }: Dependencies = {}) =>
    () =>
        Future.fromPromise(commandRunner('pnpm build')).mapError(() => 'Could not build project');
