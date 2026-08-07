import type { Project } from './project.ts';
import { resolve } from 'node:path';

export const rootFolder = resolve(import.meta.dirname, '../..');
export const projectList: Project[] = [
    // Your list of projects here
];
