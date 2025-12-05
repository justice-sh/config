import { ConfigService } from './config/config.service';

const config = new ConfigService();

const databaseUrl = config.get((env) => env.DATABASE_URL);

console.log('Database URL:', databaseUrl);
// Output -> Database URL: postgres://dev_user:dev_pass@localhost:5432/my_app_dev
