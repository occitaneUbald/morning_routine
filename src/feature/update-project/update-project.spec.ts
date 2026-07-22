import { createUpdateProject, type Dependencies } from './update-project.ts';
import { Result } from '@bloodyowl/boxed';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Update project', () => {
    let dependencies: Dependencies;
    let updateProject: ReturnType<typeof createUpdateProject>;

    beforeEach(() => {
        dependencies = {
            switchToDefaultBranch: vi.fn().mockReturnValue(Result.Ok('Success')),
            updateRepository: vi.fn().mockReturnValue(Result.Ok('Success')),
        };
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
