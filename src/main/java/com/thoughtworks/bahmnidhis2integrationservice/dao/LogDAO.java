package com.thoughtworks.bahmnidhis2integrationservice.dao;

public interface LogDAO {
    String getLastSuccessfulSyncDate(String mappingName);

    String getLatestSyncStatus(String mappingName);
}
