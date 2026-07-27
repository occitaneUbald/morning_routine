import { Future, Result } from '@bloodyowl/boxed';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { describe, expect, it, vi } from 'vitest';

type Dependencies = { execAsync?: CommandRunner };
type Options = { cwd: string };
type CommandRunner = (command: string, options?: Options) => Promise<{ stdout: string }>;

const createCommandRunner =
    ({ execAsync = promisify(exec) }: Dependencies) =>
    (command: string, options?: Options): Future<Result<string, string>> => {
        void execAsync(command, options);
        return Future.value(Result.Ok(''));
    };

describe('Command runner', () => {
    it('should delegate command to node child process', async () => {
        const execAsync = vi.fn();
        const commandRunner = createCommandRunner({ execAsync: execAsync });

        await commandRunner('git status', { cwd: './' });

        expect(execAsync).toHaveBeenCalledWith('git status', { cwd: './' });
    });
});
