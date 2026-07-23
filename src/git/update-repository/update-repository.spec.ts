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
        await updateRepository();

        expect(dependencies.commandRunner).toHaveBeenCalledWith('git pull --rebase');
    });

    it('should indicate if the repository was already up to date', async () => {
        vi.mocked(dependencies.commandRunner)?.mockResolvedValue({ stdout: 'Already up to date.\n' });

        const result = await updateRepository();

        expect(result).toEqual(Result.Ok({ alreadyUpToDate: true }));
    });

    it('should indicate if the repository was updated', async () => {
        vi.mocked(dependencies.commandRunner)?.mockResolvedValue({
            stdout: 'Updating aa32ac9..86a7b88\nFast-forward\n',
        });

        const result = await updateRepository();

        expect(result).toEqual(Result.Ok({ alreadyUpToDate: false }));
    });

    it('should return an error when git command failed', async () => {
        vi.mocked(dependencies.commandRunner)?.mockRejectedValue(new Error('error for test'));

        const result = await updateRepository();

        expect(result).toEqual(Result.Error('Could not update repository'));
    });
});
