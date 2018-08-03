package com.thoughtworks.bahmnidhis2integrationservice.service.impl;

import com.thoughtworks.bahmnidhis2integrationservice.dao.impl.MappingDAOImpl;
import com.thoughtworks.bahmnidhis2integrationservice.service.MappingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MappingServiceImpl implements MappingService {

    @Autowired
    public MappingDAOImpl mappingDAO;

    @Override
    public List<String> getMappingNames() {
        return mappingDAO.getMappingNames();
    }
}
