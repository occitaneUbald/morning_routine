import { createDefaultBranch, type Dependencies } from './default-branch.ts';
import { Result } from '@bloodyowl/boxed';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Default branch', () => {
    let defaultBranch: ReturnType<typeof createDefaultBranch>;
    let dependencies: Dependencies;

    beforeEach(() => {
        dependencies = { commandRunner: vi.fn().mockReturnValue(Buffer.from('origin/main')) };
        defaultBranch = createDefaultBranch(dependencies);
    });

    it('should retrieve default branch', () => {
        const branchName = defaultBranch();

        expect(branchName).toEqual(Result.Ok('main'));
    });

    it('should execute git command to retrieve default branch', () => {
        defaultBranch();

        expect(dependencies.commandRunner).toHaveBeenCalledWith('git rev-parse --abbrev-ref origin/HEAD');
    });

    it('should return an error when git command failed', () => {
        vi.mocked(dependencies.commandRunner)?.mockThrow(new Error('error for tests'));

        const error = defaultBranch();

        expect(error).toEqual(Result.Error('Could not find default branch for repository'));
    });
});
