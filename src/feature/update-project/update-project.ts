import { Future, Result } from '@bloodyowl/boxed';

type Options = { folder: string };
export type Dependencies = {
    switchToDefaultBranch: (options: Options) => Future<Result<unknown, string>>;
    updateRepository: (option: Options) => Future<Result<{ alreadyUpToDate: boolean }, string>>;
    installDependencies: (options: Options) => Future<Result<unknown, string>>;
};

export const createUpdateProject =
    ({ switchToDefaultBranch, updateRepository, installDependencies }: Dependencies) =>
    (options: Options) =>
        switchToDefaultBranch(options)
            .flatMapOk(() => updateRepository(options))
            .flatMapOk(({ alreadyUpToDate }) => {
                if (!alreadyUpToDate) {
                    return installDependencies(options);
                }
                return Future.value(Result.Ok('Success'));
            })
            .mapOk(() => `Project ${options.folder} was successfully updated`)
            .mapErrorToResult((e) => Result.Ok({ error: `Error updating ${options.folder}`, detail: e }));
