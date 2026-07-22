import { Result } from '@bloodyowl/boxed';
import { execSync } from 'node:child_process';

export type Dependencies = { commandRunner?: (command: string) => Buffer };

export const createDefaultBranch =
    ({ commandRunner = execSync }: Dependencies = {}) =>
    () =>
        Result.fromExecution(() => commandRunner('git rev-parse --abbrev-ref origin/HEAD'))
            .map((branch) => branch.toString())
            .map((branch) => branch.replace(/^origin\//, ''))
            .mapError(() => 'Could not find default branch for repository');
