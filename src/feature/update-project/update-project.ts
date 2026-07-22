import { Result } from '@bloodyowl/boxed';

export type Dependencies = {
    switchToDefaultBranch: () => Result<undefined, string>;
    updateRepository: () => Result<undefined, string>;
};

export const createUpdateProject =
    ({ switchToDefaultBranch, updateRepository }: Dependencies) =>
    () =>
        switchToDefaultBranch().map(updateRepository);
