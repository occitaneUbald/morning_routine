import { Future, type Result } from '@bloodyowl/boxed';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

export type CommandRunner = (command: string, options?: Options) => Future<Result<string, string>>;
export const DEFAULT_COMMAND_RUNNER: CommandRunner = (command, options) =>
    Future.fromPromise(promisify(exec)(command, options))
        .mapOk(({ stdout }) => stdout.toString())
        .mapError(keepCommandLineError);

export type Dependencies = { execAsync?: NodeCommandRunner };

type Options = { cwd: string };
type NodeCommandRunner = (command: string, options?: Options) => Promise<{ stdout: NonSharedBuffer }>;
type NonSharedBuffer = { toString: () => string };
export const createCommandRunner =
    ({ execAsync = promisify(exec) }: Dependencies = {}): CommandRunner =>
    (command: string, options?: Options) =>
        Future.fromPromise(execAsync(command, options))
            .mapOk(({ stdout }) => stdout.toString())
            .mapError(keepCommandLineError);

const keepCommandLineError = (error: unknown) => (error instanceof Error ? error.message : String(error));
