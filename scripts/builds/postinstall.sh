#!/bin/bash

create_mart_directories() {
    if [ ! -d /opt/bahmni-dhis2-integration-service/log/ ]; then
        mkdir -p /opt/bahmni-dhis2-integration-service/log/
    fi

    if [ ! -d /opt/bahmni-dhis2-integration-service/properties/ ]; then
        mkdir -p /opt/bahmni-dhis2-integration-service/properties/
    fi

}

link_directories() {
    #create links
    ln -s /opt/bahmni-dhis2-integration-service/bin/bahmni-dhis2-integration-service.sh /usr/bin/bahmni-dhis2-integration-service
    ln -s /opt/bahmni-dhis2-integration-service/log /var/log/bahmni-dhis2-integration-service
}

manage_permissions() {
    # permissions
    chown -R bahmni:bahmni /usr/bin/bahmni-dhis2-integration-service
    chown -R bahmni:bahmni /opt/bahmni-dhis2-integration-service
    chown -R bahmni:bahmni /var/log/bahmni-dhis2-integration-service
}

create_mart_directories
link_directories
manage_permissions
