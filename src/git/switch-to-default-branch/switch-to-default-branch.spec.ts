import { createSwitchToDefaultBranch, type Dependencies } from './switch-to-default-branch.ts';
import { Future, Result } from '@bloodyowl/boxed';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Switch to default branch', () => {
    let switchToDefaultBranch: ReturnType<typeof createSwitchToDefaultBranch>;
    let dependencies: Dependencies;

    beforeEach(() => {
        dependencies = {
            commandRunner: vi.fn(),
            defaultBranch: vi.fn(),
        };
        vi.mocked(dependencies.defaultBranch)?.mockReturnValue(Future.value(Result.Ok('dev')));
        vi.mocked(dependencies.commandRunner)?.mockResolvedValue({ stdout: '' });
        switchToDefaultBranch = createSwitchToDefaultBranch(dependencies);
    });

    it('should retrieve default branch', async () => {
        await switchToDefaultBranch();

        expect(dependencies.defaultBranch).toHaveBeenCalledWith();
    });

    it('should execute git command to retrieve default branch', async () => {
        await switchToDefaultBranch();

        expect(dependencies.commandRunner).toHaveBeenCalledWith('git checkout dev');
    });

    it('should return an error when git command failed', async () => {
        vi.mocked(dependencies.commandRunner)?.mockRejectedValue(new Error('error for tests'));

        const result = await switchToDefaultBranch();

        expect(result).toEqual(Result.Error('Could not checkout dev branch'));
    });
});
