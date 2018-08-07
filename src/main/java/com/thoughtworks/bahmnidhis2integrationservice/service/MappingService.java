package com.thoughtworks.bahmnidhis2integrationservice.service;

import java.util.List;

public interface MappingService {
    String saveMapping(String mappingName, String category, String lookupTable, String mappingJson) throws Exception;
    List<String> getMappingNames();
}
