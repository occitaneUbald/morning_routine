import { Result } from '@bloodyowl/boxed';
import { execSync } from 'node:child_process';

export type Dependencies = {
    commandRunner?: (command: string) => Buffer;
};

export const createBuildProject =
    ({ commandRunner = execSync }: Dependencies = {}) =>
    () =>
        Result.fromExecution(() => commandRunner('pnpm build')).mapError(() => 'Could not build project');
