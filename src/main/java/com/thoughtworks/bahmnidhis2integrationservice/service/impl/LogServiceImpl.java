package com.thoughtworks.bahmnidhis2integrationservice.service.impl;

import com.thoughtworks.bahmnidhis2integrationservice.dao.impl.LogDAOImpl;
import com.thoughtworks.bahmnidhis2integrationservice.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class LogServiceImpl implements LogService {

    @Autowired
    private LogDAOImpl logDAO;

    @Override
    public String getSyncDateForService(String mappingName) {
        return logDAO.getLastSuccessfulSyncDate(mappingName);
    }
}
