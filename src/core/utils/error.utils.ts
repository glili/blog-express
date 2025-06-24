import { BlogViewModel } from '../../blogs/types/blog-view-model';

export const createErrorMessages = (
  errors: BlogViewModel[],
): { errorsMessages: BlogViewModel[] } => {
  return { errorsMessages: errors };
};