import { type CommandRunner, DEFAULT_COMMAND_RUNNER } from '../../command-runner.ts';
import { Future, Result } from '@bloodyowl/boxed';
import { existsSync } from 'node:fs';

export type Dependencies = {
    commandRunner?: CommandRunner;
    checkFile?: (path: string) => boolean;
};

export const createInstallDependencies =
    ({ commandRunner = DEFAULT_COMMAND_RUNNER, checkFile = existsSync }: Dependencies = {}) =>
    ({ folder }: { folder: string }) => {
        if (checkFile(`${folder}/pnpm-lock.yaml`)) {
            return commandRunner('pnpm install --frozen-lockfile', { cwd: folder }).mapError(
                (error) => `Could not install dependencies: ${error}`,
            );
        }
        return Future.value(Result.Ok('Success'));
    };
