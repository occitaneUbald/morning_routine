import { createSwitchToDefaultBranch, type Dependencies } from './switch-to-default-branch.ts';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Switch to default branch', () => {
    let defaultBranch: ReturnType<typeof createSwitchToDefaultBranch>;
    let dependencies: Dependencies;

    beforeEach(() => {
        dependencies = { commandRunner: vi.fn().mockReturnValue(Buffer.from('origin/main')) };
        defaultBranch = createSwitchToDefaultBranch(dependencies);
    });

    it('should execute git command to retrieve default branch', () => {
        defaultBranch();

        expect(dependencies.commandRunner).toHaveBeenCalledWith('git checkout main');
    });
});
