package com.thoughtworks.bahmnidhis2integrationservice.service;

import java.util.List;
import java.util.Map;

public interface PreviewService {
    List<Map<String, Object>> getDeltaData(String mappingName);
}
