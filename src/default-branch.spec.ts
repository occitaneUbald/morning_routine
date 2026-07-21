import { createDefaultBranch, type Dependencies } from './default-branch.ts';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Default branch', () => {
    let defaultBranch: ReturnType<typeof createDefaultBranch>;
    let dependencies: Dependencies;

    beforeEach(() => {
        dependencies = { commandRunner: vi.fn().mockReturnValue('main') };
        defaultBranch = createDefaultBranch(dependencies);
    });

    it('should retrieve default branch', () => {
        const branchName = defaultBranch();

        expect(branchName).toBe('main');
    });

    it('should execute git command to retrieve default branch', () => {
        defaultBranch();

        expect(dependencies.commandRunner).toHaveBeenCalledWith(
            "git rev-parse --abbrev-ref origin/HEAD | sed 's@^origin/@@'",
        );
    });
});
