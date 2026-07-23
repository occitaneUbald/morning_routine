import { createFetch, type Dependencies } from './fetch.ts';
import { Result } from '@bloodyowl/boxed';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Fetch', () => {
    let fetch: ReturnType<typeof createFetch>;
    let dependencies: Dependencies;

    beforeEach(() => {
        dependencies = { commandRunner: vi.fn() };
        vi.mocked(dependencies.commandRunner)?.mockResolvedValue({ stdout: 'origin/main' });
        fetch = createFetch(dependencies);
    });

    it('should execute git command to fetch remote branches', async () => {
        await fetch({ folder: './project' });

        expect(dependencies.commandRunner).toHaveBeenCalledWith('git fetch', {
            cwd: './project',
        });
    });

    it('should return an error when git command failed', async () => {
        vi.mocked(dependencies.commandRunner)?.mockRejectedValue(new Error('error for tests'));

        const error = await fetch({ folder: './project' });

        expect(error).toEqual(Result.Error('Could not fetch repository'));
    });
});
