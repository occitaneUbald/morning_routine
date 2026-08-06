import type { Project } from '../project.ts';
import type { createUpdateProject } from './update-project/update-project.ts';
import { Future, Result } from '@bloodyowl/boxed';
import { beforeEach, describe, expect, it, vi } from 'vitest';

type Dependencies = {
    updateProject: ReturnType<typeof createUpdateProject>;
    logger: {
        info: (message: unknown) => void;
    };
};
type UpdateProjectsParameters = {
    rootDirectory: string;
    projects: Project[];
};
const createUpdateProjects =
    ({ updateProject, logger }: Dependencies) =>
    ({ rootDirectory, projects }: UpdateProjectsParameters) => {
        const futures = projects
            .map((relativePath) => ({ folder: `${rootDirectory}${relativePath}` }))
            .map((absolutePath) => updateProject(absolutePath))
            .map((future) =>
                future.tapOk(({ project }) => {
                    logger.info(`Project ${project} was successfully updated`);
                }),
            );
        return Future.all(futures).map(Result.all);
    };

describe('Update projects', () => {
    let mocks: Dependencies;
    let updateProjects: ReturnType<typeof createUpdateProjects>;
    beforeEach(() => {
        mocks = {
            updateProject: vi.fn(),
            logger: {
                info: vi.fn(),
            },
        };
        vi.mocked(mocks.updateProject).mockReturnValue(
            Future.value(Result.Ok({ status: 'success', project: 'example' })),
        );
        updateProjects = createUpdateProjects(mocks);
    });

    it('should update project', async () => {
        await updateProjects({ rootDirectory: './folder/', projects: ['example', 'example-2'] });

        expect(mocks.updateProject).toHaveBeenCalledWith({ folder: './folder/example' });
        expect(mocks.updateProject).toHaveBeenCalledWith({ folder: './folder/example-2' });
    });

    it('should put success log when project was updated', async () => {
        vi.mocked(mocks.updateProject).mockReturnValue(
            Future.value(Result.Ok({ status: 'success', project: '/folder/example' })),
        );

        await updateProjects({ rootDirectory: './folder/', projects: ['example'] });

        expect(mocks.logger.info).toHaveBeenCalledWith('Project /folder/example was successfully updated');
    });
});
