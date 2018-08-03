package com.thoughtworks.bahmnidhis2integrationservice.controller;

import com.thoughtworks.bahmnidhis2integrationservice.BahmniDhis2IntegrationServiceApplication;
import com.thoughtworks.bahmnidhis2integrationservice.SystemPropertyActiveProfileResolver;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = BahmniDhis2IntegrationServiceApplication.class)
@ActiveProfiles(profiles = "test", resolver = SystemPropertyActiveProfileResolver.class)
public class MappingControllerIT{

    @Autowired
    private MappingController mappingController;

    @Test
    public void shouldGetAllMappingNames() {
        List<String> mappingNames = mappingController.getAllMappingNames();

        int expectedRows = 2;
        List<String> expectedList = Arrays.asList("HTS Service","TB Service");

        assertEquals(expectedRows, mappingNames.size());
        assertTrue(mappingNames.containsAll(expectedList));
    }
}
