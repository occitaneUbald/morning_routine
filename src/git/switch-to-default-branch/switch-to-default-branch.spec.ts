import { createSwitchToDefaultBranch, type Dependencies } from './switch-to-default-branch.ts';
import { Result } from '@bloodyowl/boxed';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Switch to default branch', () => {
    let switchToDefaultBranch: ReturnType<typeof createSwitchToDefaultBranch>;
    let dependencies: Dependencies;

    beforeEach(() => {
        dependencies = {
            commandRunner: vi.fn(),
            defaultBranch: vi.fn().mockReturnValue(Result.Ok('dev')),
        };
        switchToDefaultBranch = createSwitchToDefaultBranch(dependencies);
    });

    it('should retrieve default branch', () => {
        switchToDefaultBranch();

        expect(dependencies.defaultBranch).toHaveBeenCalledWith();
    });

    it('should execute git command to retrieve default branch', () => {
        switchToDefaultBranch();

        expect(dependencies.commandRunner).toHaveBeenCalledWith('git checkout dev');
    });
});
