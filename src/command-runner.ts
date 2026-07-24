import { Future, type Result } from '@bloodyowl/boxed';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

type Options = { cwd: string };
export type CommandRunner = (command: string, options?: Options) => Future<Result<string, string>>;
export const DEFAULT_COMMAND_RUNNER: CommandRunner = (command, options) =>
    Future.fromPromise(promisify(exec)(command, options))
        .mapOk(({ stdout }) => stdout.toString())
        .mapError(keepCommandLineError);

const keepCommandLineError = (error: unknown) => (error instanceof Error ? error.message : '');
