FROM alpine

RUN apk update && apk add postgresql postgresql-contrib && mkdir /opt/migrate

ENV DATABASE_URL=""

COPY . /opt/migrate

CMD ["/opt/migrate/run.sh"]
