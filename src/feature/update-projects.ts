import type { Project } from '../project.ts';
import type { createUpdateProject } from './update-project/update-project.ts';
import { Future, Result } from '@bloodyowl/boxed';

export type Dependencies = {
    updateProject: ReturnType<typeof createUpdateProject>;
    logger: {
        info: (message: unknown) => void;
        error: (message: unknown) => void;
        table: (message: unknown) => void;
    };
};
type UpdateProjectsParameters = {
    rootDirectory: string;
    projects: Project[];
};
export const createUpdateProjects =
    ({ updateProject, logger }: Dependencies) =>
    ({ rootDirectory, projects }: UpdateProjectsParameters) => {
        const futures = projects
            .map((relativePath) => ({ folder: `${rootDirectory}${relativePath}` }))
            .map((absolutePath) => updateProject(absolutePath))
            .map((future) =>
                future.tapOk((result) => {
                    if (result.status === 'success') {
                        logger.info(`Project ${result.project} was successfully updated`);
                    } else {
                        logger.error(`Failed to update ${result.project}: ${result.detail}`);
                    }
                }),
            );
        return Future.all(futures)
            .map(Result.all)
            .tapOk((results) => {
                const { error } = Object.groupBy(results, ({ status }) => status);
                logger.table(error);
            });
    };
