#!/usr/bin/env bash

display_help(){
    printf "Usage:
    bahmni-dhis2-integration-service [OPTIONS]
    By default bahmni-dhis2-integration-service application is launched
    Options :

    RUN 'bahmni-dhis2-integration-service --help' for more information on a command \n"
}

launch_bahmni_mart(){
    echo "Launching bahmni-mart..."
    nohup java -jar /opt/bahmni-mart/lib/bahmni-dhis2-integration-service.jar --spring.config.location="/opt/bahmni-mart/properties/" >> /var/log/bahmni-mart/bahmni-mart.log 2>&1 &
    echo "Done"
}
