import { type CommandRunner } from '../../command-runner.ts';

export type Dependencies = { commandRunner: CommandRunner };
export const createUpdateRepository =
    ({ commandRunner }: Dependencies) =>
    ({ folder }: { folder: string }) =>
        commandRunner('git pull --rebase --autostash', { cwd: folder }).mapError(
            (error) => `Could not update repository: ${error}`,
        );
