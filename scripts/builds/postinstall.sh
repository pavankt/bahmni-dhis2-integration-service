#!/bin/bash

manage_permissions() {
    # permissions
    chown -R bahmni:bahmni /opt/bahmni-dhis2-integration-service
}

manage_user_and_group
link_directories
manage_permissions
