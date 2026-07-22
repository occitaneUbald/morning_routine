import { createUpdateRepository, type Dependencies } from './update-repository.ts';
import { Result } from '@bloodyowl/boxed';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Update repository', () => {
    let updateRepository: ReturnType<typeof createUpdateRepository>;
    let dependencies: Dependencies;

    beforeEach(() => {
        dependencies = { commandRunner: vi.fn().mockReturnValue(Buffer.from('Already up to date.\n')) };
        updateRepository = createUpdateRepository(dependencies);
    });

    it('should run a git command to update the repository', () => {
        updateRepository();

        expect(dependencies.commandRunner).toHaveBeenCalledWith('git pull --rebase');
    });

    it('should indicate if the repository was already up to date', () => {
        vi.mocked(dependencies.commandRunner)?.mockReturnValue(Buffer.from('Already up to date.\n'));

        const result = updateRepository();

        expect(result).toEqual(Result.Ok({ alreadyUpToDate: true }));
    });

    it('should indicate if the repository was updated', () => {
        vi.mocked(dependencies.commandRunner)?.mockReturnValue(
            Buffer.from('Updating aa32ac9..86a7b88\nFast-forward\n'),
        );

        const result = updateRepository();

        expect(result).toEqual(Result.Ok({ alreadyUpToDate: false }));
    });

    it('should return an error when git command failed', () => {
        vi.mocked(dependencies.commandRunner)?.mockImplementation(() => {
            throw new Error('error for test');
        });

        const result = updateRepository();

        expect(result).toEqual(Result.Error('Could not update repository'));
    });
});
