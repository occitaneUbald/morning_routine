import type { Project } from '../project.ts';
import type { createUpdateProject } from './update-project/update-project.ts';
import { Future } from '@bloodyowl/boxed';
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
    ({ rootDirectory, projects }: UpdateProjectsParameters) => {
        const futures = projects
            .map((relativePath) => ({ folder: `${rootDirectory}${relativePath}` }))
            .map((absolutePath) => updateProject(absolutePath));
        return Future.all(futures);
    };

describe('Update projects', () => {
    it('should update project', async () => {
        const mocks = {
            updateProject: vi.fn(),
        };
        const updateProjects = createUpdateProjects(mocks);

        await updateProjects({ rootDirectory: './folder/', projects: ['example', 'example-2'] });

        expect(mocks.updateProject).toHaveBeenCalledWith({ folder: './folder/example' });
        expect(mocks.updateProject).toHaveBeenCalledWith({ folder: './folder/example-2' });
    });
});
