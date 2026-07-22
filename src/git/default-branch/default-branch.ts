import { Future } from '@bloodyowl/boxed';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

export type Dependencies = { commandRunner?: (command: string) => Promise<{ stdout: string; stderr: string }> };

export const createDefaultBranch =
    ({ commandRunner = promisify(exec) }: Dependencies = {}) =>
    () =>
        Future.fromPromise(commandRunner('git rev-parse --abbrev-ref origin/HEAD'))
            .mapOk(({ stdout }) => stdout)
            .mapOk((branch) => branch.replace(/^origin\//, ''))
            .mapError(() => 'Could not find default branch for repository');
