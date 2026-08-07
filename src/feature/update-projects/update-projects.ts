import type { Project } from '../../project.ts';
import type { createUpdateProject } from '../update-project/update-project.ts';
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
            .map((relativePath) => ({ folder: `${rootDirectory}/${relativePath}` }))
            .map(
                (project) => () =>
                    updateProject(project).tapOk((result) => {
                        if (result.status === 'success') {
                            logger.info(`Project ${result.project} was successfully updated`);
                        } else {
                            logger.error(`Failed to update ${result.project}: ${result.detail}`);
                        }
                    }),
            );
        return Future.concurrent(futures, { concurrency: 2 })
            .map(Result.all)
            .tapOk((results) => {
                const { error = [] } = Object.groupBy(results, ({ status }) => status);
                if (error.length) {
                    logger.table(error);
                } else {
                    logger.info('All projects updated successfully');
                }
            });
    };
