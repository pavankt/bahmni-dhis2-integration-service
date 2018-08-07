package com.thoughtworks.bahmnidhis2integrationservice.service.impl;

import com.thoughtworks.bahmnidhis2integrationservice.dao.impl.MappingDAOImpl;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

import java.util.Arrays;
import java.util.List;

import static com.thoughtworks.bahmnidhis2integrationservice.CommonTestHelper.setValuesForMemberFields;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.when;

@RunWith(PowerMockRunner.class)
public class MappingServiceImplTest {

    private MappingServiceImpl mappingService;

    @Mock
    private MappingDAOImpl mappingDAO;

    private String mappingName = "pat_details";
    private String category = "instance";
    private String lookupTable = "patient";
    private String mappingJson = "{ 'patient_id': 'fdKe67', 'patient_name': 'mnIU7H' }";

    @Before
    public void setUp() throws Exception {
        mappingService = new MappingServiceImpl();
        setValuesForMemberFields(mappingService, "mappingDAO", mappingDAO);
    }

    @Test
    public void shouldReturnSuccessMessageOnInsertSuccess() throws Exception {
        String expected = "Successfully Added Mapping";
        when(mappingDAO.saveMapping(mappingName, category, lookupTable, mappingJson))
                .thenReturn(expected);

        String actual = mappingService.saveMapping(mappingName, category, lookupTable, mappingJson);

        verify(mappingDAO, times(1)).saveMapping(mappingName, category, lookupTable, mappingJson);
        assertEquals(expected, actual);
    }

    @Test
    public void shouldThrowErrorOnFail() throws Exception {
        String expected = "Could not able to insert";
        when(mappingDAO.saveMapping(mappingName, category, lookupTable, mappingJson))
                .thenThrow(new Exception(expected));

        try {
            mappingService.saveMapping(mappingName, category, lookupTable, mappingJson);
        } catch (Exception e) {
            verify(mappingDAO, times(1)).saveMapping(mappingName, category, lookupTable, mappingJson);
            assertEquals(expected, e.getMessage());
        }
    }

    @Test
    public void shouldGetAllMappingNames() {
        List<String> expected = Arrays.asList("HTS Service","TB Service");
        when(mappingDAO.getMappingNames()).thenReturn(expected);

        List<String> allMappings = mappingService.getMappingNames();

        assertEquals(allMappings,expected);
    }
}