#!/usr/bin/env bash

display_help(){
    printf "Usage:
    bahmni-dhis2-integration-service [OPTIONS]
    By default bahmni-dhis2-integration-service application is launched
    Options :
            Runs bahmni-dhis2-integration-service
    RUN 'bahmni-dhis2-integration-service --help' for more information on a command \n"
}

launch_bahmni_mart(){
    echo "Launching bahmni-dhis2-integration-service..."
    nohup java -jar /opt/bahmni-dhis2-integration-service/lib/bahmni-dhis2-integration-service-0.0.1-SNAPSHOT.jar --spring.config.location="/opt/bahmni-mart/properties/" >> /var/log/bahmni-dhis2-integration-service/bahmni-dhis2-integration-service.log 2>&1 &
    echo "Done"
}