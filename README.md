Run local DB with Docker:
```
  docker run --name my-blog \
    -e POSTGRES_DB=db \
    -e POSTGRES_USER=user \
    -e POSTGRES_PASSWORD=password \
    -p 6432:5432 \
    -d postgres
```
