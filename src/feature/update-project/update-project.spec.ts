import { createUpdateProject, type Dependencies } from './update-project.ts';
import { Future, Result } from '@bloodyowl/boxed';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Update project', () => {
    let dependencies: Dependencies;
    let updateProject: ReturnType<typeof createUpdateProject>;

    beforeEach(() => {
        dependencies = {
            switchToDefaultBranch: vi.fn(),
            updateRepository: vi.fn(),
            installDependencies: vi.fn(),
        };
        vi.mocked(dependencies.switchToDefaultBranch).mockReturnValue(Future.value(Result.Ok('Success')));
        vi.mocked(dependencies.updateRepository).mockReturnValue(Future.value(Result.Ok('Success')));
        vi.mocked(dependencies.installDependencies).mockReturnValue(Future.value(Result.Ok('Success')));
        updateProject = createUpdateProject(dependencies);
    });

    it('should switch to default branch', async () => {
        await updateProject({ folder: './folder' });

        expect(dependencies.switchToDefaultBranch).toHaveBeenCalledWith({ folder: './folder' });
    });

    it('should update the repository', async () => {
        await updateProject({ folder: './folder' });

        expect(dependencies.updateRepository).toHaveBeenCalledWith({ folder: './folder' });
    });

    it('should install dependencies', async () => {
        await updateProject({ folder: './folder' });

        expect(dependencies.installDependencies).toHaveBeenCalledWith({ folder: './folder' });
    });

    it('should return success', async () => {
        const result = await updateProject({ folder: './folder' });

        expect(result).toEqual(Result.Ok({ status: 'success', project: './folder' }));
    });

    it('should return message when something fails', async () => {
        vi.mocked(dependencies.switchToDefaultBranch).mockReturnValue(
            Future.value(Result.Error('Could not switch to default branch')),
        );

        const result = await updateProject({ folder: './folder' });

        expect(result).toStrictEqual(
            Result.Ok({ status: 'error', project: './folder', detail: 'Could not switch to default branch' }),
        );
    });

    it('should stop process when something fails', async () => {
        vi.mocked(dependencies.switchToDefaultBranch).mockReturnValue(
            Future.value(Result.Error('Could not switch to default branch')),
        );

        await updateProject({ folder: './folder' });

        expect(dependencies.updateRepository).not.toHaveBeenCalled();
    });
});
