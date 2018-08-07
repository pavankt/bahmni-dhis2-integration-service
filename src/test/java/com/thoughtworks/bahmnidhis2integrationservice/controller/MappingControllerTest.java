package com.thoughtworks.bahmnidhis2integrationservice.controller;

import com.thoughtworks.bahmnidhis2integrationservice.service.impl.MappingServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.thoughtworks.bahmnidhis2integrationservice.CommonTestHelper.setValuesForMemberFields;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.when;

@RunWith(PowerMockRunner.class)
public class MappingControllerTest {

    private MappingController mappingController;

    @Mock
    private MappingServiceImpl mappingService;

    private String mappingName = "patient_details";
    private String category = "instance";
    private String lookupTable = "patient";
    private String mappingJson = "{'patient_id': 'Asj8X', 'patient_name': 'jghTk9'}";


    private Map<String, String> params = new HashMap<>();

    @Before
    public void setUp() throws Exception {
        mappingController = new MappingController();
        setValuesForMemberFields(mappingController, "mappingService", mappingService);
        params.put("mappingName", mappingName);
        params.put("category", category);
        params.put("lookupTable", lookupTable);
        params.put("mappingJson", mappingJson);
    }

    @Test
    public void shouldSaveMappings() throws Exception {
        String expected = "Successfully Added Mapping";

        when(mappingService.saveMapping(mappingName, category, lookupTable, mappingJson)).thenReturn(expected);

        String actual = mappingController.saveMappings(params);

        verify(mappingService, times(1))
                .saveMapping(mappingName, category, lookupTable, mappingJson);
        assertEquals(expected, actual);
    }

    @Test
    public void shouldThrowErrorOnFail() throws Exception {
        String expected = "Could not able to add Mapping";

        when(mappingService.saveMapping(mappingName, category, lookupTable, mappingJson))
                .thenThrow(new Exception(expected));

        try {
            mappingController.saveMappings(params);
        } catch (Exception e) {
            verify(mappingService, times(1))
                    .saveMapping(mappingName, category, lookupTable, mappingJson);
            assertEquals(expected, e.getMessage());
        }
    }

    @Test
    public void shouldReturnAllMappingNames() {
        List<String> expected = Arrays.asList("HTS Service","TB Service");
        when(mappingService.getMappingNames()).thenReturn(expected);

        List<String> allMappings = mappingController.getAllMappingNames();

        assertEquals(allMappings,expected);
    }
}