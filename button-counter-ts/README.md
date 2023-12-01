# Open Docker

## Create POSTGRES SQL IMAGE
```
docker volume create postgres_volume_data
```

## Create POSTGRES CONTAINER
```
docker run -d --name postgres_container_counter -v postgres_volume_data:/var/lib/postgresql/data -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -e PGDATA=/var/lib/postgresql/data/pgdata -e POSTGRES_HOST_AUTH_METHOD=trust -p 5432:5432 --net=my_bridge postgres
```

```
npm install prisma --save-dev     
npx prisma init --datasource-provider postgresql
npx prisma migrate dev --name init 
```