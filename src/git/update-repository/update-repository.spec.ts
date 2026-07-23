import { createUpdateRepository, type Dependencies } from './update-repository.ts';
import { Result } from '@bloodyowl/boxed';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Update repository', () => {
    let updateRepository: ReturnType<typeof createUpdateRepository>;
    let dependencies: Dependencies;

    beforeEach(() => {
        dependencies = { commandRunner: vi.fn() };
        vi.mocked(dependencies.commandRunner)?.mockResolvedValue({ stdout: 'Already up to date.\n' });
        updateRepository = createUpdateRepository(dependencies);
    });

    it('should run a git command to update the repository', async () => {
        await updateRepository({ folder: './folder' });

        expect(dependencies.commandRunner).toHaveBeenCalledWith('git pull --rebase', { cwd: './folder' });
    });

    it('should return an error when git command failed', async () => {
        vi.mocked(dependencies.commandRunner)?.mockRejectedValue(new Error('error for test'));

        const result = await updateRepository({ folder: './folder' });

        expect(result).toEqual(Result.Error('Could not update repository: error for test'));
    });
});
