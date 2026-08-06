import type { Project } from '../project.ts';
import type { createUpdateProject } from './update-project/update-project.ts';
import { describe, expect, it, vi } from 'vitest';

type Dependencies = {
    updateProject: ReturnType<typeof createUpdateProject>;
};
type UpdateProjectsParameters = {
    rootDirectory: string;
    projects: Project[];
};
const createUpdateProjects =
    ({ updateProject }: Dependencies) =>
    async ({ rootDirectory, projects }: UpdateProjectsParameters) =>
        updateProject({ folder: `${rootDirectory}${projects[0]}` });

describe('Update projects', () => {
    it('should update project', async () => {
        const mocks = {
            updateProject: vi.fn(),
        };
        const updateProjects = createUpdateProjects(mocks);

        await updateProjects({ rootDirectory: './folder/', projects: ['example'] });

        expect(mocks.updateProject).toHaveBeenCalledWith({ folder: './folder/example' });
    });
});
