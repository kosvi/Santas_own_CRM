/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Sequelize } from 'sequelize';
// https://github.com/sequelize/umzug
import { Umzug, SequelizeStorage } from 'umzug';
import { DATABASE_URL, NODE_ENV, POSTGRES_SSL } from './config';
import { validateToString } from './validators';
import url from 'url';
import { MigrationDirection } from '../types';
import { logger } from './logger';

interface DatabaseUrl {
  host: string;
  username: string;
  password: string;
  database: string;
  port: number;
}

const parseDatabaseUrl = (dbUrl: string): DatabaseUrl => {
  const parsedDatabaseUrl = url.parse(validateToString(dbUrl));
  const host = validateToString(parsedDatabaseUrl.hostname);
  const username = validateToString(parsedDatabaseUrl.auth?.split(':')[0]);
  const password = validateToString(parsedDatabaseUrl.auth?.split(':')[1]);
  const database = validateToString(parsedDatabaseUrl.path?.slice(1));
  const port = parseInt(validateToString(parsedDatabaseUrl.port));
  return {
    host,
    username,
    password,
    database,
    port
  };
};

// a bit unprofessional to leave stackoverflow-links to comments?
// https://stackoverflow.com/questions/60014874/how-to-use-typescript-with-sequelize
const databaseUrl: DatabaseUrl = parseDatabaseUrl(validateToString(DATABASE_URL));
// check if postgres needs ssl-configuration
const useSsl = POSTGRES_SSL ? { ssl: { require: true, rejectUnauthorized: false } } : {};
// log SQL-queries to console in develop-mode
const sequelizeLogging = NODE_ENV === 'develop' ? {} : { logging: false };
export const sequelize = new Sequelize({
  dialect: 'postgres',
  ...databaseUrl,
  dialectOptions: {
    ...useSsl
  },
  ...sequelizeLogging
});

export const runMigration = async (direction: MigrationDirection) => {
  // no logging when running in production
  const umzugLogger = NODE_ENV === 'develop' ? console : undefined;
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
    logger: umzugLogger
  });
  // this will revert ALL migrations, 
  // used for resetting database (probably not the most optimal way, but this isn't for production env)
  if ((NODE_ENV === 'test' || NODE_ENV === 'develop') && direction === 'down') {
    await migrator.down({ to: 0 });
  } else {
    await migrator.up();
  }
  logger.log('Migrations ready');
};

export const connectionToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigration('up');
    logger.log('Connected to database');
  } catch (error) {
    let msg = 'Connection to database failed';
    if (error instanceof Error) {
      msg = `${msg}: ${error.message}`;
    }
    logger.error(msg);
    return process.exit(1);
  }
  return null;
};
