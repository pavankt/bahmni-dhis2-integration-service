package com.thoughtworks.bahmnidhis2integrationservice.dao;

import com.thoughtworks.bahmnidhis2integrationservice.exception.NoMappingFoundException;

import java.util.List;
import java.util.Map;

public interface MappingDAO {
    String saveMapping(String mappingName, String lookupTable, String mappingJson, String currentMapping, String user) throws Exception;
    List<String> getMappingNames();

    Map<String, Object> getMapping(String mappingName) throws NoMappingFoundException;

    String saveMapping(List<Object> mappingsList) throws Exception;
}
