import { execSync } from 'node:child_process';

export type Dependencies = { commandRunner?: (command: string) => Buffer };

export const createDefaultBranch =
    ({ commandRunner = execSync }: Dependencies = {}) =>
    () =>
        commandRunner("git rev-parse --abbrev-ref origin/HEAD | sed 's@^origin/@@'").toString();
