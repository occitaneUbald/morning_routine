import type { Result } from '@bloodyowl/boxed';
import { beforeEach, describe, expect, it, vi } from 'vitest';

type Dependencies = { switchToDefaultBranch: () => Result<undefined, string> };
const createUpdateProject =
    ({ switchToDefaultBranch }: Dependencies) =>
    () => {
        switchToDefaultBranch();
    };

describe('Update project', () => {
    let dependencies: Dependencies;
    let updateProject: ReturnType<typeof createUpdateProject>;

    beforeEach(() => {
        dependencies = { switchToDefaultBranch: vi.fn() };
        updateProject = createUpdateProject(dependencies);
    });

    it('should switch to default branch', () => {
        updateProject();

        expect(dependencies.switchToDefaultBranch).toHaveBeenCalled();
    });
});
