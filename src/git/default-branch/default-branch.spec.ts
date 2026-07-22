import { createDefaultBranch, type Dependencies } from './default-branch.ts';
import { Result } from '@bloodyowl/boxed';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Default branch', () => {
    let defaultBranch: ReturnType<typeof createDefaultBranch>;
    let dependencies: Dependencies;

    beforeEach(() => {
        dependencies = { commandRunner: vi.fn() };
        vi.mocked(dependencies.commandRunner)?.mockResolvedValue({ stdout: 'origin/main', stderr: '' });
        defaultBranch = createDefaultBranch(dependencies);
    });

    it('should retrieve default branch', async () => {
        const branchName = await defaultBranch();

        expect(branchName).toEqual(Result.Ok('main'));
    });

    it('should execute git command to retrieve default branch', async () => {
        await defaultBranch();

        expect(dependencies.commandRunner).toHaveBeenCalledWith('git rev-parse --abbrev-ref origin/HEAD');
    });

    it('should return an error when git command failed', async () => {
        vi.mocked(dependencies.commandRunner)?.mockRejectedValue(new Error('error for tests'));

        const error = await defaultBranch();

        expect(error).toEqual(Result.Error('Could not find default branch for repository'));
    });
});
