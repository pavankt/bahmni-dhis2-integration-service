package com.thoughtworks.bahmnidhis2integrationservice.controller;

import com.thoughtworks.bahmnidhis2integrationservice.service.impl.MappingServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

import java.util.Arrays;
import java.util.List;

import static com.thoughtworks.bahmnidhis2integrationservice.CommonTestHelper.setValuesForMemberFields;
import static org.junit.Assert.*;
import static org.powermock.api.mockito.PowerMockito.when;

@RunWith(PowerMockRunner.class)
public class MappingControllerTest {

    private MappingController mappingController;

    @Mock
    private MappingServiceImpl mappingService;

    @Before
    public void setUp() throws Exception {
        mappingController = new MappingController();
        setValuesForMemberFields(mappingController, "mappingService", mappingService);
    }

    @Test
    public void shouldReturnAllMappingNames() {
        List<String> expected = Arrays.asList("HTS Service","TB Service");
        when(mappingService.getMappingNames()).thenReturn(expected);

        List<String> allMappings = mappingController.getAllMappingNames();

        assertEquals(allMappings,expected);
    }
}