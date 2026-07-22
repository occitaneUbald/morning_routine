import { Result } from '@bloodyowl/boxed';
import { execSync } from 'node:child_process';

export type Dependencies = { commandRunner?: (command: string) => Buffer };
export const createUpdateRepository =
    ({ commandRunner = execSync }: Dependencies = {}) =>
    () =>
        Result.fromExecution(() => commandRunner('git pull --rebase')).mapError(() => 'Could not update repository');
