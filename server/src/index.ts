import * as dotenv from 'dotenv';
import { app } from './server';

dotenv.config();

const { HTTP_PORT } = process.env;

const httpPort: number = parseInt(HTTP_PORT as string, 10) || 8080;

app.listen(httpPort, '0.0.0.0', () => {
    console.log(`Server listen on port ${httpPort}...`);
});

