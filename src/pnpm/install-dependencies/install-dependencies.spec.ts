import { createInstallDependencies, type Dependencies } from './install-dependencies.ts';
import { Result } from '@bloodyowl/boxed';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Install dependencies', () => {
    let dependencies: Dependencies;
    let installDependencies: ReturnType<typeof createInstallDependencies>;

    beforeEach(() => {
        dependencies = { commandRunner: vi.fn() };
        vi.mocked(dependencies.commandRunner)?.mockResolvedValue({ stdout: '' });
        installDependencies = createInstallDependencies(dependencies);
    });

    it('should run command to install dependencies', async () => {
        await installDependencies({ folder: './folder' });

        expect(dependencies.commandRunner).toHaveBeenCalledWith(
            '[ -f pnpm-lock.yaml ] && pnpm install --frozen-lockfile',
            { cwd: './folder' },
        );
    });

    it('should return error when command failed', async () => {
        vi.mocked(dependencies.commandRunner)?.mockRejectedValue(new Error('error for tests'));

        const result = await installDependencies({ folder: './folder' });

        expect(result).toEqual(Result.Error('Could not install dependencies'));
    });
});
