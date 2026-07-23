import { type CommandRunner, DEFAULT_COMMAND_RUNNER } from '../../command-runner.ts';
import { Future } from '@bloodyowl/boxed';

export type Dependencies = { commandRunner?: CommandRunner };
export const createUpdateRepository =
    ({ commandRunner = DEFAULT_COMMAND_RUNNER }: Dependencies = {}) =>
    () =>
        Future.fromPromise(commandRunner('git pull --rebase'))
            .mapOk((commandResult) => ({ alreadyUpToDate: commandResult.stdout.includes('Already up to date') }))
            .mapError(() => 'Could not update repository');
