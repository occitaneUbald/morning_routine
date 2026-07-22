import { createUpdateRepository } from './git/update-repository/update-repository.ts';

const defaultBranch = createUpdateRepository();
defaultBranch();
