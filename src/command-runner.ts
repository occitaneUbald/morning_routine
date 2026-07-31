import { Future, type Result } from '@bloodyowl/boxed';
import { exec } from 'node:child_process';
import { resolve } from 'node:path';
import { promisify } from 'node:util';

export type CommandRunner = (command: string, options?: Options) => Future<Result<string, string>>;
export type Dependencies = { execAsync?: NodeCommandRunner; pathResolve?: (relativePath: string) => string };

type Options = { cwd: string };
type NodeCommandRunner = (command: string, options?: Options) => Promise<{ stdout: Stringable }>;
type Stringable = { toString: () => string };
export const createCommandRunner =
    ({ execAsync = promisify(exec), pathResolve = resolve }: Dependencies = {}): CommandRunner =>
    (command: string, options?: Options) =>
        Future.fromPromise(execAsync(command, { ...options, cwd: pathResolve(options?.cwd ?? '') }))
            .mapOk(({ stdout }) => stdout.toString())
            .mapError(keepCommandLineError);

const keepCommandLineError = (error: unknown) => (error instanceof Error ? error.message : String(error));
