import { Result } from '@bloodyowl/boxed';
import { execSync } from 'node:child_process';
import { describe, expect, it, vi } from 'vitest';

type Dependencies = {
    commandRunner?: (command: string) => Buffer;
};
const createInstallDependencies =
    ({ commandRunner = execSync }: Dependencies = {}) =>
    () =>
        Result.fromExecution(() => commandRunner('pnpm install --frozen-lockfile')).mapError(
            () => 'Could not install dependencies',
        );

describe('Install dependencies', () => {
    it('should run command to install dependencies', () => {
        const dependencies = { commandRunner: vi.fn() };
        const installDependencies = createInstallDependencies(dependencies);

        installDependencies();

        expect(dependencies.commandRunner).toHaveBeenCalledWith('pnpm install --frozen-lockfile');
    });

    it('should return error when command failed', () => {
        const dependencies = { commandRunner: vi.fn().mockThrow(new Error('error for tests')) };
        const installDependencies = createInstallDependencies(dependencies);

        const result = installDependencies();

        expect(result).toEqual(Result.Error('Could not install dependencies'));
    });
});
