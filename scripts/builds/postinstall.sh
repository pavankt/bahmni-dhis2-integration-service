#!/bin/bash

manage_user_and_group() {
    #create bahmni user and group if doesn't exist
    USERID=bahmni
    GROUPID=bahmni
    /bin/id -g $GROUPID 2>/dev/null
    [ $? -eq 1 ]
    groupadd bahmni

    /bin/id $USERID 2>/dev/null
    [ $? -eq 1 ]
    useradd -g bahmni bahmni
}

create_bahmnidhis2integration_directories() {
    if [ ! -d /opt/bahmni-dhis2-integration-service/log/ ]; then
        mkdir -p /opt/bahmni-dhis2-integration-service/log/
    fi

    if [ ! -d /var/www/bahmni_config/ ]; then
        mkdir -p /var/www/bahmni_config/
    fi
}

link_directories() {
    #create links
    ln -s /opt/bahmni-dhis2-integration-service/log /var/log/bahmni-dhis2-integration-service

    if [ ! -d /var/www/bahmni_config/bahmni-dhis2-integration-service/ ]; then
        ln -s /opt/bahmni-dhis2-integration-service/conf /var/www/bahmni_config/bahmni-dhis2-integration-service
    fi
}

manage_permissions() {
    # permissions
    chown -R bahmni:bahmni /opt/bahmni-dhis2-integration-service
    chown -R bahmni:bahmni /var/log/bahmni-dhis2-integration-service
}

manage_user_and_group
create_bahmnidhis2integration_directories
link_directories
manage_permissions
