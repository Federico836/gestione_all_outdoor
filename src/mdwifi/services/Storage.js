/**
 * @format
 * @flow
 */

import DbStorage from './DbStorage';
import DiskStorage from './DiskStorage';

const storage = {
  db: DbStorage,
  disk: DiskStorage,
};

export default storage;
