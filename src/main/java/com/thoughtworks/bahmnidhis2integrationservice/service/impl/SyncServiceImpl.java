package com.thoughtworks.bahmnidhis2integrationservice.service.impl;

import com.thoughtworks.bahmnidhis2integrationservice.dao.impl.SyncRepositoryImpl;
import com.thoughtworks.bahmnidhis2integrationservice.service.SyncService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SyncServiceImpl implements SyncService {

    @Autowired
    private SyncRepositoryImpl syncRepository;

    @Override
    public void sync(String body) {
        syncRepository.sync(body);
    }
}
