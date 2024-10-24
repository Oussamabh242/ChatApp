#!/bin/bash

start_containers() {
    echo "Starting PostgreSQL ..."
    echo "user : myuser"
    echo "password : mypassword"
    docker start my-postgres-container
    echo " ----------------------------"	

    echo "Starting pgAdmin ..."
    echo "mail : admin@example.com"
    echo "password : admin"
    docker start my-pgadmin

    echo "starting node server ..."
    npm run dev
}

stop_containers() {
    echo "Stopping PostgreSQL ..."
    docker stop my-postgres-container

    echo "Stopping pgAdmin ..."
    docker stop my-pgadmin
}

if [ "$1" == "start" ]; then
    start_containers
elif [ "$1" == "stop" ]; then
    stop_containers
else
    echo "Usage: $0 {start|stop}"
fi

