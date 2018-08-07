package com.thoughtworks.bahmnidhis2integrationservice.dao;

import java.util.List;

public interface MappingDAO {
    String saveMapping(String mappingName, String category, String lookupTable, String mappingJson) throws Exception;
    List<String> getMappingNames();
}
