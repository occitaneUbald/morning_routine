import { Future, Result } from '@bloodyowl/boxed';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { beforeEach, describe, expect, it, vi } from 'vitest';

type Dependencies = { execAsync?: NodeCommandRunner };
type Options = { cwd: string };
type NodeCommandRunner = (command: string, options?: Options) => Promise<{ stdout: NonSharedBuffer }>;
type NonSharedBuffer = { toString: () => string };

const createCommandRunner =
    ({ execAsync = promisify(exec) }: Dependencies) =>
    async (command: string, options?: Options): Promise<Result<string, string>> => {
        return Future.fromPromise(execAsync(command, options))
            .mapOk(({ stdout }) => stdout.toString())
            .mapError((error) => (error as Error).message);
    };

describe('Command runner', () => {
    let commandRunner: ReturnType<typeof createCommandRunner>;
    let mocks: Dependencies;
    beforeEach(() => {
        mocks = { execAsync: vi.fn() };
        vi.mocked(mocks.execAsync)?.mockResolvedValue({ stdout: 'example' });
        commandRunner = createCommandRunner(mocks);
    });

    it('should delegate command to node child process', async () => {
        await commandRunner('git status', { cwd: './' });

        expect(mocks.execAsync).toHaveBeenCalledWith('git status', { cwd: './' });
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
});
