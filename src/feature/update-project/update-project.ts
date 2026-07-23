import { Future, Result } from '@bloodyowl/boxed';

type Options = { folder: string };
export type Dependencies = {
    switchToDefaultBranch: (options: Options) => Future<Result<unknown, string>>;
    updateRepository: (option: Options) => Future<Result<unknown, string>>;
    installDependencies: (options: Options) => Future<Result<unknown, string>>;
};

export const createUpdateProject =
    ({ switchToDefaultBranch, updateRepository, installDependencies }: Dependencies) =>
    (options: Options) =>
        switchToDefaultBranch(options)
            .flatMapOk(() => updateRepository(options))
            .flatMapOk(() => installDependencies(options))
            .mapOk(() => ({ status: 'success', project: options.folder }))
            .mapErrorToResult((detail) => Result.Ok({ status: 'error', project: options.folder, detail: detail }));
