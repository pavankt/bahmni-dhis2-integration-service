package com.thoughtworks.bahmnidhis2integrationservice.service.impl;

import com.thoughtworks.bahmnidhis2integrationservice.dao.impl.MarkerDAOImpl;
import com.thoughtworks.bahmnidhis2integrationservice.service.MarkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MarkerServiceImpl implements MarkerService {

    @Autowired
    private MarkerDAOImpl markerDAO;

    @Override
    public void createEntriesForNewService(String programName) {
        markerDAO.createMarkerEntries(programName);
    }
}
