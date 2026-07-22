import { createSwitchToDefaultBranch, type Dependencies } from './switch-to-default-branch.ts';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Switch to default branch', () => {
    let switchToDefaultBranch: ReturnType<typeof createSwitchToDefaultBranch>;
    let dependencies: Dependencies;

    beforeEach(() => {
        dependencies = {
            commandRunner: vi.fn().mockReturnValue(Buffer.from('origin/main')),
            defaultBranch: vi.fn(),
        };
        switchToDefaultBranch = createSwitchToDefaultBranch(dependencies);
    });

    it('should retrieve default branch', () => {
        switchToDefaultBranch();

        expect(dependencies.defaultBranch).toHaveBeenCalledWith();
    });

    it('should execute git command to retrieve default branch', () => {
        switchToDefaultBranch();

        expect(dependencies.commandRunner).toHaveBeenCalledWith('git checkout main');
    });
});
