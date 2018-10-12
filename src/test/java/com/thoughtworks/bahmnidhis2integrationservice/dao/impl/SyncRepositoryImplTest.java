package com.thoughtworks.bahmnidhis2integrationservice.dao.impl;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.core.classloader.annotations.PowerMockIgnore;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.slf4j.Logger;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import static com.thoughtworks.bahmnidhis2integrationservice.CommonTestHelper.setValuesForMemberFields;
import static org.mockito.Mockito.*;
import static org.powermock.api.mockito.PowerMockito.doNothing;
import static org.powermock.api.mockito.PowerMockito.whenNew;

@RunWith(PowerMockRunner.class)
@PrepareForTest({SyncRepositoryImpl.class})
@PowerMockIgnore("javax.management.*")
public class SyncRepositoryImplTest {
    private SyncRepositoryImpl syncRepository;

    @Mock
    private RestTemplate restTemplate;

    @Mock
    private Logger logger;

    @Mock
    private HttpClientErrorException httpClientErrorException;

    @Mock
    private HttpServerErrorException httpServerErrorException;

    @Before
    public void setUp() throws Exception {
        syncRepository = new SyncRepositoryImpl();

        setValuesForMemberFields(syncRepository,"logger", logger);
        whenNew(RestTemplate.class).withNoArguments().thenReturn(restTemplate);
    }

    @Test
    public void shouldCallPutMethodOfRestTemplate() {
        String URI = "http://localhost/sync/pushData";
        String body = "{" +
                "service: \"someMapping\"," +
                "user: \"superman\"," +
                "comment: \"This is a comment\" " +
                "}";
        doNothing().when(restTemplate).put(URI, body);
        syncRepository.sync(body);
        verify(restTemplate, times(1)).put(URI, body);
    }

    @Test
    public void shouldLogClientException() {
        String URI = "http://localhost/sync/pushData";
        String exceptionMessage = "Some exception based on server data";
        String errorMsg = "[Client Exception]:" + exceptionMessage;

        when(httpClientErrorException.getMessage()).thenReturn(exceptionMessage);
        Mockito.doThrow(httpClientErrorException).when(restTemplate).put(URI, "");

        syncRepository.sync("");

        verify(logger, times(1)).error(errorMsg);
        verify(httpClientErrorException, times(1)).getMessage();
    }

    @Test
    public void shouldLogServerException() {
        String URI = "http://localhost/sync/pushData";
        String exceptionMessage = "Some exception based on client data";
        String errorMsg = "[Server Exception]:" + exceptionMessage;

        when(httpServerErrorException.getMessage()).thenReturn(exceptionMessage);
        Mockito.doThrow(httpServerErrorException).when(restTemplate).put(URI, "");

        syncRepository.sync("");

        verify(logger, times(1)).error(errorMsg);
        verify(httpServerErrorException, times(1)).getMessage();
    }
}