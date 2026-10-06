import * as migration_20261006_220317_initial from './20261006_220317_initial';

export const migrations = [
  {
    up: migration_20261006_220317_initial.up,
    down: migration_20261006_220317_initial.down,
    name: '20261006_220317_initial'
  },
];
