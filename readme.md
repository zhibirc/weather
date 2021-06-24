# weather &middot; [![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](LICENSE) [![Maintenance](https://img.shields.io/maintenance/yes/2021.svg?style=flat-square)]() [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg)]()

![weather](./screenshot.png)

<p align="center">Full-Stack Web App (consists of a client side and a server part) as a playground for experiments and learning Docker/Docker Compose/NGINX etc.</p>

## About

Application called **Weather** has the following capabilities:

- input field for location name, and a submit button in browser UI
- user can specify some location name for getting weather for and press the button
- back-end listen for POST HTTP request and validate user input from it
- back-end communicates with two external services:
    - [OpenWeather](https://openweathermap.org/) for retrieving weather for particular location
    - [Pexels](https://www.pexels.com/api/) for retrieving image demonstrated the specific weather state
- both weather and image metadata return by back-end to the browser
- client logic parses the given JSON data and render it appropriately

## Containerize

Choose suitable variant from the below and normally the Web UI should be available on **http://localhost:8080/**.

1) One-Command Deployment (_without_ cloning the repo)

```shell
curl -L https://github.com/zhibirc/weather/archive/refs/tags/v1.0.tar.gz | tar xz && cd weather-1.0 && npm start
```

2) One-Command Deployment (after cloning the repo)

```shell
# it calls "docker compose up --build"
npm start
```

3) Build and setup manually

```shell
# build and deploy front-end
docker build --tag front-end --no-cache ./public
# build and deploy back-end
docker build --tag back-end --no-cache ./server
# create network to connect both parts
docker network create weather-net
# run server and add to existing network
docker run --name back-end --network weather-net -p 8081:8081 -d back-end
# run front-end and add to existing network
docker run --name front-end --network weather-net -p 8080:80 -d front-end
```

For _public_ aka _front-end_ part the `nginx.conf` (default NGINX configuration file) is mounted from host system (`./public/nginx.conf`)
for simplifying development process. Edit this file if needed and send the `HUP` signal to Docker to reload the NGINX configuration:

```shell
docker kill -s HUP <container_name>
```

## Contributing

I'm grateful to the community for contributing bug fixes and improvements. Read [checklist](./checklist.md) to learn how you can take part in improving.

## License

**weather** is [MIT licensed](./LICENSE)

**favicon** author: &copy; 2020 Twitter, Inc and other contributors (https://github.com/twitter/twemoji) | CC-BY 4.0 (https://creativecommons.org/licenses/by/4.0/)
