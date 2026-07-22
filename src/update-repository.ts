import { execSync } from 'node:child_process';

export type Dependencies = { commandRunner?: (command: string) => Buffer };
export const createUpdateRepository =
    ({ commandRunner = execSync }: Dependencies = {}) =>
    () => {
        commandRunner('git pull --rebase');
    };
