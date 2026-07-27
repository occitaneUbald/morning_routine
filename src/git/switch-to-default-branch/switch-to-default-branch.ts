import { type CommandRunner } from '../../command-runner.ts';
import { Future, Result } from '@bloodyowl/boxed';

export type Dependencies = {
    commandRunner: CommandRunner;
    defaultBranch: ({ folder }: { folder: string }) => Future<Result<string, string>>;
};

export const createSwitchToDefaultBranch =
    ({ defaultBranch, commandRunner }: Dependencies) =>
    ({ folder }: { folder: string }) =>
        defaultBranch({ folder }).flatMapOk((branch) =>
            commandRunner(`git checkout ${branch}`, { cwd: folder }).mapError(
                (error) => `Could not checkout ${branch} branch: ${error}`,
            ),
        );
