import { createUpdateRepository, type Dependencies } from './update-repository.ts';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Update repository', () => {
    let updateRepository: ReturnType<typeof createUpdateRepository>;
    let dependencies: Dependencies;

    beforeEach(() => {
        dependencies = { commandRunner: vi.fn() };
        updateRepository = createUpdateRepository(dependencies);
    });

    it('should run a git command to update the repository', () => {
        updateRepository();

        expect(dependencies.commandRunner).toHaveBeenCalledWith('git pull --rebase');
    });
});
