import { execSync } from 'node:child_process';
import { beforeEach, describe, expect, it, vi } from 'vitest';

type Dependencies = { commandRunner?: (command: string) => Buffer };
const createDefaultBranch =
    ({ commandRunner: _ = execSync }: Dependencies) =>
    () =>
        'main';

describe('Default branch', () => {
    let defaultBranch: ReturnType<typeof createDefaultBranch>;

    beforeEach(() => {
        defaultBranch = createDefaultBranch({ commandRunner: vi.fn() });
    });

    it('should retrieve default branch', () => {
        const branchName = defaultBranch();

        expect(branchName).toBe('main');
    });
});
