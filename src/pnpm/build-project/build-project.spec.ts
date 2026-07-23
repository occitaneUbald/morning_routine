import { createBuildProject, type Dependencies } from './build-project.ts';
import { Result } from '@bloodyowl/boxed';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Build project', () => {
    let dependencies: Dependencies;
    let buildProject: ReturnType<typeof createBuildProject>;

    beforeEach(() => {
        dependencies = { commandRunner: vi.fn() };
        vi.mocked(dependencies.commandRunner)?.mockResolvedValue({ stdout: '' });
        buildProject = createBuildProject(dependencies);
    });

    it('should run command to install dependencies', async () => {
        await buildProject();

        expect(dependencies.commandRunner).toHaveBeenCalledWith('pnpm build');
    });

    it('should return error when command failed', async () => {
        vi.mocked(dependencies.commandRunner)?.mockRejectedValue(new Error('error for tests'));

        const result = await buildProject();

        expect(result).toEqual(Result.Error('Could not build project'));
    });
});
