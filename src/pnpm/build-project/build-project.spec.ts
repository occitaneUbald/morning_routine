import { createBuildProject, type Dependencies } from './build-project.ts';
import { Result } from '@bloodyowl/boxed';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Build project', () => {
    let dependencies: Dependencies;
    let buildProject: ReturnType<typeof createBuildProject>;

    beforeEach(() => {
        dependencies = { commandRunner: vi.fn() };
        buildProject = createBuildProject(dependencies);
    });

    it('should run command to install dependencies', () => {
        buildProject();

        expect(dependencies.commandRunner).toHaveBeenCalledWith('pnpm build');
    });

    it('should return error when command failed', () => {
        vi.mocked(dependencies.commandRunner)?.mockThrow(new Error('error for tests'));

        const result = buildProject();

        expect(result).toEqual(Result.Error('Could not build project'));
    });
});
