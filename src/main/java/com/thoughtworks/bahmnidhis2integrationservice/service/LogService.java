package com.thoughtworks.bahmnidhis2integrationservice.service;

public interface LogService {
    String getSyncDateForService(String MappingName);

    String getLatestSyncStatus(String mappingName);
}
