import { Future, Result } from '@bloodyowl/boxed';

type Options = { folder: string };
export type Dependencies = {
    switchToDefaultBranch: (options: Options) => Future<Result<unknown, string>>;
    updateRepository: (option: Options) => Future<Result<unknown, string>>;
    installDependencies: (options: Options) => Future<Result<unknown, string>>;
    logger: {
        info: (message: unknown) => void;
        error: (message: unknown) => void;
    };
};

export const createUpdateProject =
    ({ switchToDefaultBranch, updateRepository, installDependencies, logger }: Dependencies) =>
    (options: Options) =>
        switchToDefaultBranch(options)
            .flatMapOk(() => updateRepository(options))
            .flatMapOk(() => installDependencies(options))
            .mapOk(() => ({ status: 'success', project: options.folder }) as const)
            .tapOk(({ project }) => {
                logger.info(`Project ${project} was successfully updated`);
            })
            .mapErrorToResult((detail) =>
                Result.Ok({ status: 'error', project: options.folder, detail: detail } as const),
            );
