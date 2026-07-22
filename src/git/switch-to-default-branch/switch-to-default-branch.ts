import { execSync } from 'node:child_process';

export type Dependencies = {
    commandRunner?: (command: string) => Buffer;
};

export const createSwitchToDefaultBranch =
    ({ commandRunner = execSync }: Dependencies = {}) =>
    () =>
        commandRunner('git checkout main');
