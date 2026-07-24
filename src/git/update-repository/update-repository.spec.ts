import { createUpdateRepository, type Dependencies } from './update-repository.ts';
import { Future, Result } from '@bloodyowl/boxed';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Update repository', () => {
    let updateRepository: ReturnType<typeof createUpdateRepository>;
    let dependencies: Dependencies;

    beforeEach(() => {
        dependencies = { commandRunner: vi.fn() };
        vi.mocked(dependencies.commandRunner)?.mockReturnValue(Future.value(Result.Ok('Success')));
        updateRepository = createUpdateRepository(dependencies);
    });

    it('should run a git command to update the repository', async () => {
        await updateRepository({ folder: './folder' });

        expect(dependencies.commandRunner).toHaveBeenCalledWith('git pull --rebase --autostash', { cwd: './folder' });
    });

    it('should return an error when git command failed', async () => {
        vi.mocked(dependencies.commandRunner)?.mockReturnValue(Future.value(Result.Error('error for test')));

        const result = await updateRepository({ folder: './folder' });

        expect(result).toEqual(Result.Error('Could not update repository: error for test'));
    });
});
