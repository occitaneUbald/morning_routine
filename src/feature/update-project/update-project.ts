import { type Future, Result } from '@bloodyowl/boxed';

export type Dependencies = {
    switchToDefaultBranch: () => Future<Result<unknown, string>>;
    updateRepository: () => Result<{ alreadyUpToDate: boolean }, string>;
    installDependencies: () => Result<unknown, string>;
};

export const createUpdateProject =
    ({ switchToDefaultBranch, updateRepository, installDependencies }: Dependencies) =>
    () =>
        switchToDefaultBranch()
            .mapOkToResult(updateRepository)
            .mapOkToResult(({ alreadyUpToDate }) => {
                if (!alreadyUpToDate) {
                    return installDependencies();
                }
                return Result.Ok('Success');
            });
