import { createDefaultBranch, type Dependencies } from './default-branch.ts';
import { Future, Result } from '@bloodyowl/boxed';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Default branch', () => {
    let defaultBranch: ReturnType<typeof createDefaultBranch>;
    let dependencies: Dependencies;

    beforeEach(() => {
        dependencies = { commandRunner: vi.fn() };
        vi.mocked(dependencies.commandRunner)?.mockReturnValue(Future.value(Result.Ok('origin/main')));
        defaultBranch = createDefaultBranch(dependencies);
    });

    it('should retrieve default branch', async () => {
        const branchName = await defaultBranch({ folder: './project' });

        expect(branchName).toEqual(Result.Ok('main'));
    });

    it('should execute git command to retrieve default branch', async () => {
        await defaultBranch({ folder: './project' });

        expect(dependencies.commandRunner).toHaveBeenCalledWith('git rev-parse --abbrev-ref origin/HEAD', {
            cwd: './project',
        });
    });

    it('should return an error when git command failed', async () => {
        vi.mocked(dependencies.commandRunner)?.mockReturnValue(Future.value(Result.Error('error for tests')));

        const error = await defaultBranch({ folder: './project' });

        expect(error).toEqual(Result.Error('Could not find default branch for repository: error for tests'));
    });
});
