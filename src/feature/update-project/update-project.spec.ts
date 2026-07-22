import { createUpdateProject, type Dependencies } from './update-project.ts';
import { Result } from '@bloodyowl/boxed';
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
        vi.mocked(dependencies.switchToDefaultBranch)?.mockReturnValue(Result.Ok('Success'));
        vi.mocked(dependencies.updateRepository)?.mockReturnValue(Result.Ok({ alreadyUpToDate: false }));
        vi.mocked(dependencies.installDependencies)?.mockReturnValue(Result.Ok('Success'));
        updateProject = createUpdateProject(dependencies);
    });

    it('should switch to default branch', () => {
        updateProject();

        expect(dependencies.switchToDefaultBranch).toHaveBeenCalled();
    });

    it('should update the repository', () => {
        updateProject();

        expect(dependencies.updateRepository).toHaveBeenCalled();
    });

    it('should install dependencies', () => {
        updateProject();

        expect(dependencies.installDependencies).toHaveBeenCalled();
    });

    it('should not install dependencies when project was already up to date', () => {
        vi.mocked(dependencies.updateRepository).mockReturnValue(Result.Ok({ alreadyUpToDate: true }));

        updateProject();

        expect(dependencies.installDependencies).not.toHaveBeenCalled();
    });

    it('should return success', () => {
        const result = updateProject();

        expect(result).toEqual(Result.Ok('Success'));
    });

    it('should return an error when something fails', () => {
        vi.mocked(dependencies.switchToDefaultBranch).mockReturnValue(
            Result.Error('Could not switch to default branch'),
        );

        const result = updateProject();

        expect(result).toBe(Result.Error('Could not switch to default branch'));
    });

    it('should stop process when something fails', () => {
        vi.mocked(dependencies.switchToDefaultBranch).mockReturnValue(
            Result.Error('Could not switch to default branch'),
        );

        updateProject();

        expect(dependencies.updateRepository).not.toHaveBeenCalled();
    });
});
