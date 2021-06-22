import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import axios from 'axios';
import { createClient as pexel } from 'pexels';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

dotenv.config();

const {
    /** @see {@link https://openweathermap.org/ OpenWeather} */
    WEATHER_PROVIDER_HOST,
    WEATHER_PROVIDER_API_KEY,

    /** @see {@link https://www.pexels.com/api/ Pexels} */
    IMAGE_PROVIDER_HOST,
    IMAGE_PROVIDER_API_KEY
} = process.env;

if ( !WEATHER_PROVIDER_HOST || !WEATHER_PROVIDER_API_KEY ) {
    console.log('weather provider options are required, terminate');
    process.exit(1);
}

const app = express();
const corsOptions = {
    origin: '*',
    methods: ['OPTIONS', 'POST']
}

// @ts-ignore
let imageProvider = null;

if ( IMAGE_PROVIDER_API_KEY && IMAGE_PROVIDER_HOST ) {
    imageProvider = pexel(IMAGE_PROVIDER_API_KEY);
}

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

app.post('/', ( request: Request, response: Response ) => {
    const { location } = request.body;

    axios
        .get(`${WEATHER_PROVIDER_HOST}?q=${location}&appid=${WEATHER_PROVIDER_API_KEY}&units=metric`)
        .then(async data => {
            const weatherData = data.data;
            const { main: name, description } = weatherData.weather[0];
            let imageData = null;

            if ( description || name ) {
                // @ts-ignore
                imageData = imageProvider && await imageProvider.photos.search({
                    query: description || `weather ${name}`,
                    orientation: 'landscape',
                    per_page: 3
                });
            }

            response
                .status(StatusCodes.OK)
                .send({
                    weatherData,
                    imageData
                });
        })
        .catch(error => {
            console.log(error);
            response
                .status(StatusCodes.NOT_FOUND)
                .send(ReasonPhrases.NOT_FOUND);
        });
});

export { app };
