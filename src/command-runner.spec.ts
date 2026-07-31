import { createCommandRunner, type Dependencies } from './command-runner.ts';
import { Result } from '@bloodyowl/boxed';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Command runner', () => {
    let commandRunner: ReturnType<typeof createCommandRunner>;
    let mocks: Dependencies;
    beforeEach(() => {
        mocks = { execAsync: vi.fn(), pathResolve: vi.fn() };
        vi.mocked(mocks.pathResolve)?.mockReturnValue('/absolute-path/');
        vi.mocked(mocks.execAsync)?.mockResolvedValue({ stdout: Buffer.from('example') });
        commandRunner = createCommandRunner(mocks);
    });

    it('should delegate command to node child process', async () => {
        await commandRunner('git status', { cwd: './' });

        expect(mocks.execAsync).toHaveBeenCalledWith('git status', { cwd: '/absolute-path/' });
    });

    it('should extract stdout output as return value', async () => {
        const result = await commandRunner('git status', { cwd: './' });

        expect(result).toEqual(Result.Ok('example'));
    });

    it('should keep error message as result', async () => {
        vi.mocked(mocks.execAsync)?.mockRejectedValue(new Error('error for tests'));

        const result = await commandRunner('git status', { cwd: './' });

        expect(result).toEqual(Result.Error('error for tests'));
    });

    it('should keep message when not an error', async () => {
        vi.mocked(mocks.execAsync)?.mockRejectedValue('error for tests');

        const result = await commandRunner('git status', { cwd: './' });

        expect(result).toEqual(Result.Error('error for tests'));
    });
});
