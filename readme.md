# weather &middot; [![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](LICENSE) [![Maintenance](https://img.shields.io/maintenance/yes/2021.svg?style=flat-square)]() [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg)]()

![weather](./screenshot.png)

## Usage

## Containerize

```shell
# build and deploy front-end
docker build --tag weather-public --no-cache ./public
# build and deploy back-end
docker build --tag weather-server --no-cache ./server
# create network to connect both parts
docker network create weather-net
# run server and add to existing network
docker run --name weather-server --network weather-net -p 8081:8081 -d weather-server
# run front-end and add to existing network
docker run --name weather-public --network weather-net -p 8080:80 -d weather-public
```

## Contributing

I'm grateful to the community for contributing bug fixes and improvements. Read [checklist](./checklist.md) to learn how you can take part in improving.

## License

**weather** is [MIT licensed](./LICENSE)
