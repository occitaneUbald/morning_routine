import { execSync } from 'node:child_process';
import { describe, expect, it, vi } from 'vitest';

type Dependencies = {
    commandRunner?: (command: string) => Buffer;
};
const createInstallDependencies =
    ({ commandRunner = execSync }: Dependencies = {}) =>
    () =>
        commandRunner('pnpm install --frozen-lockfile');

describe('Install dependencies', () => {
    it('should run command to install dependencies', () => {
        const dependencies = { commandRunner: vi.fn() };
        const installDependencies = createInstallDependencies(dependencies);

        installDependencies();

        expect(dependencies.commandRunner).toHaveBeenCalledWith('pnpm install --frozen-lockfile');
    });
});
