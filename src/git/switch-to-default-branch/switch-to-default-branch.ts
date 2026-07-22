import { type CommandRunner, DEFAULT_COMMAND_RUNNER } from '../../command-runner.ts';
import { Future, Result } from '@bloodyowl/boxed';

export type Dependencies = {
    commandRunner?: CommandRunner;
    defaultBranch: () => Future<Result<string, string>>;
};

export const createSwitchToDefaultBranch =
    ({ defaultBranch, commandRunner = DEFAULT_COMMAND_RUNNER }: Dependencies) =>
    () =>
        defaultBranch().flatMapOk((branch) =>
            Future.fromPromise(commandRunner(`git checkout ${branch}`)).mapError(
                () => `Could not checkout ${branch} branch`,
            ),
        );
