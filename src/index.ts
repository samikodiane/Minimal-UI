// Reexport the native module. On web, it will be resolved to MinimalUIModule.web.ts
// and on native platforms to MinimalUIModule.ts
export { default } from './MinimalUIModule';
export * from './MinimalUI.types';
