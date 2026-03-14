import { getDocs } from '../utils/content';

export default defineEventHandler(async () => {
  return getDocs();
});
