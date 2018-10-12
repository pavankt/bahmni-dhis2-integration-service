package com.thoughtworks.bahmnidhis2integrationservice.service.impl;

import com.thoughtworks.bahmnidhis2integrationservice.dao.impl.MappingDAOImpl;
import com.thoughtworks.bahmnidhis2integrationservice.exception.NoMappingFoundException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    private String lookupTable = "{\"instance\" : \"patient\"}";
    private String mappingJson = "{\"instance\" : {\"patient_id\": \"Asj8X\", \"patient_name\": \"jghTk9\"}}";
    private String currentMapping = "";
    private String user = "superman";

    @Before
    public void setUp() throws Exception {
        mappingService = new MappingServiceImpl();
        setValuesForMemberFields(mappingService, "mappingDAO", mappingDAO);
    }

    @Test
    public void shouldReturnSuccessMessageOnInsertSuccess() throws Exception {
        String expected = "Successfully Added Mapping";
        when(mappingDAO.saveMapping(mappingName, lookupTable, mappingJson, currentMapping, user))
                .thenReturn(expected);

        String actual = mappingService.saveMapping(mappingName, lookupTable, mappingJson, currentMapping, user);

        verify(mappingDAO, times(1)).saveMapping(mappingName, lookupTable, mappingJson, currentMapping, user);
        assertEquals(expected, actual);
    }

    @Test
    public void shouldThrowErrorOnFail() throws Exception {
        String expected = "Could not able to insert";
        when(mappingDAO.saveMapping(mappingName, lookupTable, mappingJson, currentMapping, user))
                .thenThrow(new Exception(expected));

        try {
            mappingService.saveMapping(mappingName, lookupTable, mappingJson, currentMapping, user);
        } catch (Exception e) {
            verify(mappingDAO, times(1)).saveMapping(mappingName, lookupTable, mappingJson, currentMapping, user);
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

    @Test
    public void shouldGetExistingMapping() throws NoMappingFoundException {
        Map<String, Object> HTSMapping = new HashMap<>();

        HTSMapping.put("mapping_name","HTS Service");
        HTSMapping.put("lookup_table","{\"instance\" : \"patient\"}");
        HTSMapping.put("mapping_json","{\"instance\" : {\"patient_id\": \"Asj8X\", \"patient_name\": \"jghTk9\"}}");

        when(mappingDAO.getMapping("HTS Service")).thenReturn(HTSMapping);

        assertEquals(HTSMapping, mappingService.getMapping("HTS Service"));

        verify(mappingDAO, times(1)).getMapping("HTS Service");
    }

    @Test
    public void shouldThrowEmptyResultDataAccessExceptionWhenThereIsNoMapping() throws NoMappingFoundException {
        String mappingName = "someMapping";

        when(
                mappingDAO.getMapping(mappingName)
        ).thenThrow(new NoMappingFoundException(mappingName));

        try{
            mappingService.getMapping(mappingName);
        }catch (NoMappingFoundException e){
            assertEquals(e.getMessage(),"No mapping found with name "+mappingName);
        }
    }

    @Test
    public void shouldReturnSuccessMessageOnSuccessImportOfMappings() throws Exception {
        String expected = "Successfully Added Mapping";
        String mapping = "{" +
                "\"mapping_name\":\"test2\"," +
                "\"lookup_table\":" +
                "\"{" +
                "\"instance\":\"hts_instance_table\"," +
                "\"enrollments\":\"hts_program_enrollment_table\"," +
                "\"event\":\"hts_program_events_table" +
                "\"}\"," +
                "\"mapping_json\":" +
                "\"{" +
                "\"instance\":" +
                "{" +
                "\"Patient_Identifier\":\"\"," +
                "\"UIC\":\"rOb34aQLSyC\"," +
                "}," +
                "\"event\":" +
                "{" +
                "\"self_testing_outcome\":\"gwatO1kb3Fy\"," +
                "\"client_received\":\"gXNu7zJBTDN\"" +
                "}" +
                "}\"," +
                "\"user\":\"superman\"" +
                "}";

        List<Object> mappings = Collections.singletonList(mapping);

        when(mappingDAO.saveMapping(mappings)).thenReturn(expected);

        String actual = mappingService.saveMapping(mappings);

        verify(mappingDAO, times(1)).saveMapping(mappings);
        assertEquals(expected, actual);
    }

    @Test
    public void shouldThrowErrorOnMappingImportFail() throws Exception {
        String expected = "Could not able to insert";
        String mapping = "{" +
                "\"mapping_name\":\"test2\"," +
                "\"lookup_table\":" +
                "\"{" +
                "\"instance\":\"hts_instance_table\"," +
                "\"enrollments\":\"hts_program_enrollment_table\"," +
                "\"event\":\"hts_program_events_table" +
                "\"}\"," +
                "\"mapping_json\":" +
                "\"{" +
                "\"instance\":" +
                "{" +
                "\"Patient_Identifier\":\"\"," +
                "\"UIC\":\"rOb34aQLSyC\"," +
                "}," +
                "\"event\":" +
                "{" +
                "\"self_testing_outcome\":\"gwatO1kb3Fy\"," +
                "\"client_received\":\"gXNu7zJBTDN\"" +
                "}" +
                "}\"," +
                "\"user\":\"superman\"" +
                "}";

        List<Object> mappings = Collections.singletonList(mapping);
        when(mappingDAO.saveMapping(mappings)).thenThrow(new Exception(expected));

        try {
            mappingService.saveMapping(mappings);
        } catch (Exception e) {
            verify(mappingDAO, times(1)).saveMapping(mappings);
            assertEquals(expected, e.getMessage());
        }
    }
}
