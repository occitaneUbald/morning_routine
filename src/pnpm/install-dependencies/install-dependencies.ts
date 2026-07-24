import { type CommandRunner, DEFAULT_COMMAND_RUNNER } from '../../command-runner.ts';
import { Future } from '@bloodyowl/boxed';
import { existsSync } from 'node:fs';

export type Dependencies = {
    commandRunner?: CommandRunner;
    checkFile?: (path: string) => boolean;
};

export const createInstallDependencies =
    ({ commandRunner = DEFAULT_COMMAND_RUNNER, checkFile = existsSync }: Dependencies = {}) =>
    ({ folder }: { folder: string }) => {
        checkFile(`${folder}/pnpm-lock.yaml`);
        return Future.fromPromise(commandRunner('pnpm install --frozen-lockfile', { cwd: folder })).mapError(
            () => 'Could not install dependencies',
        );
    };
