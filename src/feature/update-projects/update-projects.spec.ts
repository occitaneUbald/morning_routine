import { createUpdateProjects, type Dependencies } from './update-projects.ts';
import { Future, Result } from '@bloodyowl/boxed';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Update projects', () => {
    let mocks: Dependencies;
    let updateProjects: ReturnType<typeof createUpdateProjects>;
    beforeEach(() => {
        mocks = {
            updateProject: vi.fn(),
            logger: {
                info: vi.fn(),
                error: vi.fn(),
                table: vi.fn(),
            },
        };
        vi.mocked(mocks.updateProject).mockReturnValue(
            Future.value(Result.Ok({ status: 'success', project: 'example' })),
        );
        updateProjects = createUpdateProjects(mocks);
    });

    it('should update project', async () => {
        await updateProjects({ rootDirectory: './folder', projects: ['example', 'example-2'] });

        expect(mocks.updateProject).toHaveBeenCalledWith({ folder: './folder/example' });
        expect(mocks.updateProject).toHaveBeenCalledWith({ folder: './folder/example-2' });
    });

    it('should return a report object', async () => {
        const result = await updateProjects({ rootDirectory: './folder/', projects: ['example'] });

        expect(result).toStrictEqual(Result.Ok([{ status: 'success', project: 'example' }]));
    });

    it('should log a success when project was updated', async () => {
        vi.mocked(mocks.updateProject).mockReturnValue(
            Future.value(Result.Ok({ status: 'success', project: '/folder/example' })),
        );

        await updateProjects({ rootDirectory: './folder', projects: ['example'] });

        expect(mocks.logger.info).toHaveBeenCalledWith('Project /folder/example was successfully updated');
    });

    it('should log an error when project failed to udpate', async () => {
        vi.mocked(mocks.updateProject).mockReturnValue(
            Future.value(
                Result.Ok({ status: 'error', project: '/folder/example', detail: 'Failed to install dependencies' }),
            ),
        );

        await updateProjects({ rootDirectory: './folder', projects: ['example'] });

        expect(mocks.logger.error).toHaveBeenCalledWith(
            'Failed to update /folder/example: Failed to install dependencies',
        );
    });

    it('should print a report of failures at the end', async () => {
        vi.mocked(mocks.updateProject).mockReturnValue(
            Future.value(
                Result.Ok({ status: 'error', project: '/folder/example', detail: 'Failed to install dependencies' }),
            ),
        );

        await updateProjects({ rootDirectory: './folder', projects: ['example'] });

        expect(mocks.logger.table).toHaveBeenCalledWith([
            { status: 'error', project: '/folder/example', detail: 'Failed to install dependencies' },
        ]);
    });

    it('should not print report when there are no failures', async () => {
        vi.mocked(mocks.updateProject).mockReturnValue(
            Future.value(Result.Ok({ status: 'success', project: '/folder/example' })),
        );

        await updateProjects({ rootDirectory: './folder', projects: ['example'] });

        expect(mocks.logger.table).not.toHaveBeenCalled();
        expect(mocks.logger.info).toHaveBeenCalledWith('All projects updated successfully');
    });
});
