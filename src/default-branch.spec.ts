import { execSync } from 'node:child_process';
import { describe, expect, it, vi } from 'vitest';

type Dependencies = { commandRunner?: (command: string) => Buffer };
const createDefaultBranch =
    ({ commandRunner: _ = execSync }: Dependencies) =>
    () =>
        'main';

describe('Default branch', () => {
    it('should retrieve default branch', () => {
        const defaultBranch = createDefaultBranch({ commandRunner: vi.fn() });

        const branchName = defaultBranch();

        expect(branchName).toBe('main');
    });
});
