import { type CommandRunner } from '../../command-runner.ts';

export type Dependencies = { commandRunner: CommandRunner };

export const createDefaultBranch =
    ({ commandRunner }: Dependencies) =>
    ({ folder }: { folder: string }) =>
        commandRunner('git rev-parse --abbrev-ref origin/HEAD', { cwd: folder })
            .mapOk((branch) => branch.replace(/^origin\//, ''))
            .mapError(
                (error) =>
                    `Could not find default branch for repository (try \`git remote set-head origin --auto\`): ${error}`,
            );
