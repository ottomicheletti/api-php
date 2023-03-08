FROM mysql:latest
COPY ./db.sql /docker-entrypoint-initdb.d/
USER root
RUN chmod 755 /var/lib/mysql
