import { createInstallDependencies, type Dependencies } from './install-dependencies.ts';
import { Result } from '@bloodyowl/boxed';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Install dependencies', () => {
    let dependencies: Dependencies;
    let installDependencies: ReturnType<typeof createInstallDependencies>;

    beforeEach(() => {
        dependencies = { commandRunner: vi.fn(), checkFile: vi.fn() };
        vi.mocked(dependencies.checkFile)?.mockReturnValue(true);
        vi.mocked(dependencies.commandRunner)?.mockResolvedValue({ stdout: '' });
        installDependencies = createInstallDependencies(dependencies);
    });

    it('should check if pnpm-lock.yaml file exist', async () => {
        await installDependencies({ folder: './folder' });

        expect(dependencies.checkFile).toHaveBeenCalledWith('./folder/pnpm-lock.yaml');
    });

    it('should not run command if pnpm-lock does not exist', async () => {
        vi.mocked(dependencies.checkFile)?.mockReturnValue(false);

        await installDependencies({ folder: './folder' });

        expect(dependencies.commandRunner).not.toHaveBeenCalled();
    });

    it('should return success when pnpm-lock is missing', async () => {
        vi.mocked(dependencies.checkFile)?.mockReturnValue(false);

        const result = await installDependencies({ folder: './folder' });

        expect(result).toStrictEqual(Result.Ok('Success'));
    });

    it('should run command to install dependencies', async () => {
        await installDependencies({ folder: './folder' });

        expect(dependencies.commandRunner).toHaveBeenCalledWith('pnpm install --frozen-lockfile', { cwd: './folder' });
    });

    it('should return error when command failed', async () => {
        vi.mocked(dependencies.commandRunner)?.mockRejectedValue(new Error('error for tests'));

        const result = await installDependencies({ folder: './folder' });

        expect(result).toEqual(Result.Error('Could not install dependencies'));
    });
});
