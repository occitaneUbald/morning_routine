import { Result } from '@bloodyowl/boxed';

export type Dependencies = {
    switchToDefaultBranch: () => Result<unknown, string>;
    updateRepository: () => Result<{ alreadyUpToDate: boolean }, string>;
    installDependencies: () => Result<unknown, string>;
};

export const createUpdateProject =
    ({ switchToDefaultBranch, updateRepository, installDependencies }: Dependencies) =>
    () =>
        switchToDefaultBranch()
            .flatMap(updateRepository)
            .flatMap(({ alreadyUpToDate }) => {
                if (!alreadyUpToDate) {
                    return installDependencies();
                }
                return Result.Ok('Success');
            });
