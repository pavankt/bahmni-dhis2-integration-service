package com.thoughtworks.bahmnidhis2integrationservice.service.impl;

import com.thoughtworks.bahmnidhis2integrationservice.dao.impl.MappingDAOImpl;
import com.thoughtworks.bahmnidhis2integrationservice.service.MappingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MappingServiceImpl implements MappingService {

    @Autowired
    private MappingDAOImpl mappingDAO;

    @Override
    public String saveMapping(String mappingName, String lookupTable, String mappingJson) throws Exception {
        return mappingDAO.saveMapping(mappingName, lookupTable, mappingJson);
    }

    @Override
    public List<String> getMappingNames() {
        return mappingDAO.getMappingNames();
    }
}
