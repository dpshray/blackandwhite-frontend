export const normalizeFiles = (files: any): File[] => {
  if (!files) return [];
  if (files instanceof FileList) return Array.from(files);
  if (Array.isArray(files)) return files;
  return [files];
};