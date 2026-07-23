import { type CommandRunner, DEFAULT_COMMAND_RUNNER } from '../../command-runner.ts';
import { Future } from '@bloodyowl/boxed';

export type Dependencies = { commandRunner?: CommandRunner };
export const createUpdateRepository =
    ({ commandRunner = DEFAULT_COMMAND_RUNNER }: Dependencies = {}) =>
    ({ folder }: { folder: string }) =>
        Future.fromPromise(commandRunner('git pull --rebase', { cwd: folder }))
            .mapOk((commandResult) => ({ alreadyUpToDate: commandResult.stdout.includes('Already up to date') }))
            .mapError((error) => `Could not update repository` + keepCommandLineError(error));

const keepCommandLineError = (error: unknown) => (error instanceof Error ? `: ${error.message}` : '');
