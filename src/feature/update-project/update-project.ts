import { Result } from '@bloodyowl/boxed';

export type Dependencies = {
    switchToDefaultBranch: () => Result<unknown, string>;
    updateRepository: () => Result<unknown, string>;
};

export const createUpdateProject =
    ({ switchToDefaultBranch, updateRepository }: Dependencies) =>
    () =>
        switchToDefaultBranch().map(updateRepository);
