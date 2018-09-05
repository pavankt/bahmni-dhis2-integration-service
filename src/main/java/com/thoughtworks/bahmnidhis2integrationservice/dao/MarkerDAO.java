package com.thoughtworks.bahmnidhis2integrationservice.dao;

public interface MarkerDAO {
    void createMarkerEntries(String oldMappingName, String newMappingName);
}
