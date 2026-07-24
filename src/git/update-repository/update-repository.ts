import { type CommandRunner, DEFAULT_COMMAND_RUNNER } from '../../command-runner.ts';

export type Dependencies = { commandRunner?: CommandRunner };
export const createUpdateRepository =
    ({ commandRunner = DEFAULT_COMMAND_RUNNER }: Dependencies = {}) =>
    ({ folder }: { folder: string }) =>
        commandRunner('git pull --rebase', { cwd: folder }).mapError(
            (error) => `Could not update repository: ${error}`,
        );
