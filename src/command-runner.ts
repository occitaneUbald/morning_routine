import { exec } from 'node:child_process';
import { promisify } from 'node:util';

type Options = { cwd: string };
export type CommandRunner = (command: string, options?: Options) => Promise<{ stdout: string }>;
export const DEFAULT_COMMAND_RUNNER: CommandRunner = promisify(exec);
