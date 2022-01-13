/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Sequelize } from 'sequelize';
// https://github.com/sequelize/umzug
import { Umzug, SequelizeStorage } from 'umzug';
import { DATABASE_URL } from './config';
import { validateToString } from './validators';

// https://stackoverflow.com/questions/60014874/how-to-use-typescript-with-sequelize
export const sequelize = new Sequelize(validateToString(DATABASE_URL));

/*
export const sequelize = new Sequelize({
  database: validateToString(DATABASE_URL),
  dialect: 'postgres',
  host: 'db',
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false
    }
  }
});
*/

export const runMigration = async (down: boolean) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const migrator = new Umzug({
    migrations: {
      glob: `${process.cwd()}/migrations/*.js`,
      resolve: ({ name, path, context }) => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const migration = require(validateToString(path));
        return {
          name,
          up: async () => await migration.up(context, Sequelize),
          down: async () => await migration.down(context, Sequelize)
        };
      },
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console
  });
  if (down) {
    await migrator.down();
  } else {
    await migrator.up();
  }
  console.log('Migrations ready');
};

export const connectionToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigration(false);
    console.log('Connected to database');
  } catch (error) {
    console.log('Connection to database failed', error);
    return process.exit(1);
  }
  return null;
};
