import { DriverViewModel } from '../../blogs/types/blog-view-model';

export const createErrorMessages = (
  errors: DriverViewModel[],
): { errorsMessages: DriverViewModel[] } => {
  return { errorsMessages: errors };
};