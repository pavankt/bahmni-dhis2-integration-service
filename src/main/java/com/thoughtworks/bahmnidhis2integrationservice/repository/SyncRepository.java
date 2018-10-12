package com.thoughtworks.bahmnidhis2integrationservice.repository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

@Repository
public class SyncRepository {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    public void sync(String body) {
        try {
            new RestTemplate().exchange("http://localhost/sync/pushData",
                    HttpMethod.PUT,
                    new HttpEntity<>(body, getHeaders()),
                    Object.class
            );
        } catch (HttpClientErrorException e) {
            String errorMsg = "[Client Exception]:" + e.getMessage();
            logger.error(errorMsg);
        } catch (HttpServerErrorException e) {
            String errorMsg = "[Server Exception]:" + e.getMessage();
            logger.error(errorMsg);
        }
    }

    private HttpHeaders getHeaders() {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        return httpHeaders;
    }
}
