import { exec } from 'node:child_process';
import { promisify } from 'node:util';

export type CommandRunner = (command: string) => Promise<{ stdout: string }>;
export const DEFAULT_COMMAND_RUNNER: CommandRunner = promisify(exec);
