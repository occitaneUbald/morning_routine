import type { Result } from '@bloodyowl/boxed';
import { describe, expect, it, vi } from 'vitest';

type Dependencies = { switchToDefaultBranch: () => Result<undefined, string> };
const createUpdateProject =
    ({ switchToDefaultBranch }: Dependencies) =>
    () => {
        switchToDefaultBranch();
    };

describe('Update project', () => {
    it('should switch to default branch', () => {
        const dependencies = { switchToDefaultBranch: vi.fn() };
        const updateProject = createUpdateProject(dependencies);

        updateProject();

        expect(dependencies.switchToDefaultBranch).toHaveBeenCalled();
    });
});
