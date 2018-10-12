package com.thoughtworks.bahmnidhis2integrationservice.dao.impl;

import com.thoughtworks.bahmnidhis2integrationservice.dao.SyncRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

@Component
public class SyncRepositoryImpl implements SyncRepository {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public void sync(String body) {
        try {
            new RestTemplate().put("http://localhost/sync/pushData", body);
        } catch (HttpClientErrorException e) {
            String errorMsg = "[Client Exception]:" + e.getMessage();
            logger.error(errorMsg);
        } catch (HttpServerErrorException e){
            String errorMsg = "[Server Exception]:" + e.getMessage();
            logger.error(errorMsg);
        }
    }
}
