import { Result } from '@bloodyowl/boxed';
import { execSync } from 'node:child_process';

export type Dependencies = {
    commandRunner?: (command: string) => Buffer;
};

export const createInstallDependencies =
    ({ commandRunner = execSync }: Dependencies = {}) =>
    () =>
        Result.fromExecution(() => commandRunner('pnpm install --frozen-lockfile')).mapError(
            () => 'Could not install dependencies',
        );
