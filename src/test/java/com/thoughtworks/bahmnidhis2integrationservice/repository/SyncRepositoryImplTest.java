package com.thoughtworks.bahmnidhis2integrationservice.repository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.core.classloader.annotations.PowerMockIgnore;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.slf4j.Logger;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import static com.thoughtworks.bahmnidhis2integrationservice.CommonTestHelper.setValuesForMemberFields;
import static org.mockito.Mockito.*;
import static org.powermock.api.mockito.PowerMockito.whenNew;

@RunWith(PowerMockRunner.class)
@PrepareForTest({SyncRepository.class})
@PowerMockIgnore("javax.management.*")
public class SyncRepositoryImplTest {
    private SyncRepository syncRepository;
    private String body;

    @Mock
    private RestTemplate restTemplate;

    @Mock
    private Logger logger;

    @Mock
    private HttpClientErrorException httpClientErrorException;

    @Mock
    private HttpServerErrorException httpServerErrorException;

    @Mock
    private HttpHeaders httpHeaders;

    @Mock
    private HttpEntity httpEntity;

    @Before
    public void setUp() throws Exception {
        body = "{" +
                "service: \"someMapping\"," +
                "user: \"superman\"," +
                "comment: \"This is a comment\" " +
                "}";

        syncRepository = new SyncRepository();

        setValuesForMemberFields(syncRepository,"logger", logger);
        whenNew(RestTemplate.class).withNoArguments().thenReturn(restTemplate);
        whenNew(HttpHeaders.class).withNoArguments().thenReturn(httpHeaders);
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        whenNew(HttpEntity.class).withArguments(body, httpHeaders).thenReturn(httpEntity);
    }

    @Test
    public void shouldCallExchangeMethodOfRestTemplate() throws Exception {
        String URI = "http://localhost/sync/pushData";
        syncRepository.sync(body);
        verify(restTemplate, times(1)).exchange(URI, HttpMethod.PUT, httpEntity, Object.class);
    }

    @Test
    public void shouldLogClientException() {
        String URI = "http://localhost/sync/pushData";
        String exceptionMessage = "Some exception based on server data";
        String errorMsg = "[Client Exception]:" + exceptionMessage;

        when(httpClientErrorException.getMessage()).thenReturn(exceptionMessage);
        Mockito.doThrow(httpClientErrorException).when(restTemplate).exchange(URI, HttpMethod.PUT, httpEntity, Object.class);

        syncRepository.sync(body);

        verify(logger, times(1)).error(errorMsg);
        verify(httpClientErrorException, times(1)).getMessage();
    }

    @Test
    public void shouldLogServerException() {
        String URI = "http://localhost/sync/pushData";
        String exceptionMessage = "Some exception based on client data";
        String errorMsg = "[Server Exception]:" + exceptionMessage;

        when(httpServerErrorException.getMessage()).thenReturn(exceptionMessage);
        Mockito.doThrow(httpServerErrorException).when(restTemplate).exchange(URI, HttpMethod.PUT, httpEntity, Object.class);

        syncRepository.sync(body);

        verify(logger, times(1)).error(errorMsg);
        verify(httpServerErrorException, times(1)).getMessage();
    }
}