import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        isolate: false,
        coverage: {
            include: ['src/**/*.ts'],
            reporter: ['cobertura', 'text', 'text-summary', 'html', 'lcov'],
        },
    },
});
