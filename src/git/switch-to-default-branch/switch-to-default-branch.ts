import type { Result } from '@bloodyowl/boxed';
import { execSync } from 'node:child_process';

export type Dependencies = {
    commandRunner?: (command: string) => Buffer;
    defaultBranch: () => Result<string, string>;
};

export const createSwitchToDefaultBranch =
    ({ defaultBranch, commandRunner = execSync }: Dependencies) =>
    () =>
        defaultBranch().map((branch) => commandRunner(`git checkout ${branch}`));
