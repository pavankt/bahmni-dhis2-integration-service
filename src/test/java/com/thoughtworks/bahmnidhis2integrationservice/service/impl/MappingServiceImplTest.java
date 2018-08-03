package com.thoughtworks.bahmnidhis2integrationservice.service.impl;

import com.thoughtworks.bahmnidhis2integrationservice.dao.impl.MappingDAOImpl;
import org.junit.Assert;
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
public class MappingServiceImplTest {

    private MappingServiceImpl mappingService;

    @Mock
    private MappingDAOImpl mappingDAO;

    @Before
    public void setUp() throws Exception {
        mappingService = new MappingServiceImpl();
        setValuesForMemberFields(mappingService, "mappingDAO",mappingDAO);
    }

    @Test
    public void shouldGetAllMappingNames() {
        List<String> expected = Arrays.asList("HTS Service","TB Service");
        when(mappingDAO.getMappingNames()).thenReturn(expected);

        List<String> allMappings = mappingService.getMappingNames();

        assertEquals(allMappings,expected);
    }
}