import { Future, Result } from '@bloodyowl/boxed';

type Options = { folder: string };
export type Dependencies = {
    fetch: (options: Options) => Future<Result<unknown, string>>;
    switchToDefaultBranch: (options: Options) => Future<Result<unknown, string>>;
    updateRepository: (option: Options) => Future<Result<{ alreadyUpToDate: boolean }, string>>;
    installDependencies: (options: Options) => Future<Result<unknown, string>>;
};

export const createUpdateProject =
    ({ fetch, switchToDefaultBranch, updateRepository, installDependencies }: Dependencies) =>
    (options: Options) =>
        fetch(options)
            .flatMapOk(() => switchToDefaultBranch(options))
            .flatMapOk(() => updateRepository(options))
            .flatMapOk(({ alreadyUpToDate }) => {
                if (!alreadyUpToDate) {
                    return installDependencies(options);
                }
                return Future.value(Result.Ok('Success'));
            })
            .mapOk(() => ({ status: 'success', project: options.folder }))
            .mapErrorToResult((detail) => Result.Ok({ status: 'error', project: options.folder, detail: detail }));
