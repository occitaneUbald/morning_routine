import { createInstallDependencies, type Dependencies } from './install-dependencies.ts';
import { Result } from '@bloodyowl/boxed';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Install dependencies', () => {
    let dependencies: Dependencies;
    let installDependencies: ReturnType<typeof createInstallDependencies>;

    beforeEach(() => {
        dependencies = { commandRunner: vi.fn() };
        installDependencies = createInstallDependencies(dependencies);
    });

    it('should run command to install dependencies', () => {
        installDependencies();

        expect(dependencies.commandRunner).toHaveBeenCalledWith('pnpm install --frozen-lockfile');
    });

    it('should return error when command failed', () => {
        vi.mocked(dependencies.commandRunner)?.mockThrow(new Error('error for tests'));

        const result = installDependencies();

        expect(result).toEqual(Result.Error('Could not install dependencies'));
    });
});
