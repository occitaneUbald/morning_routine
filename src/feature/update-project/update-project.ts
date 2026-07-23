import { Future, Result } from '@bloodyowl/boxed';

export type Dependencies = {
    switchToDefaultBranch: () => Future<Result<unknown, string>>;
    updateRepository: () => Future<Result<{ alreadyUpToDate: boolean }, string>>;
    installDependencies: () => Future<Result<unknown, string>>;
};

export const createUpdateProject =
    ({ switchToDefaultBranch, updateRepository, installDependencies }: Dependencies) =>
    () =>
        switchToDefaultBranch()
            .flatMapOk(updateRepository)
            .flatMapOk(({ alreadyUpToDate }) => {
                if (!alreadyUpToDate) {
                    return installDependencies();
                }
                return Future.value(Result.Ok('Success'));
            });
