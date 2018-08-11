package com.thoughtworks.bahmnidhis2integrationservice.dao.impl;

import com.thoughtworks.bahmnidhis2integrationservice.exception.NoMappingFoundException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.jdbc.core.JdbcTemplate;

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
public class MappingDAOImplTest {

    private MappingDAOImpl mappingDAO;

    @Mock
    private JdbcTemplate jdbcTemplate;

    private String mappingName = "patient_details";
    private String category = "instance";
    private String lookupTable = "{\"instance\" : \"patient\"}";
    private String mappingJson = "{\"instance\" : {\"patient_id\": \"Asj8X\", \"patient_name\": \"jghTk9\"}}";
    private String sql = String.format("INSERT INTO mapping (mapping_name, category, lookup_table, mapping_json) " +
            "VALUES ('%s', '%s', '%s', '%s')", mappingName, category, lookupTable, mappingJson);

    @Before
    public void setUp() throws Exception {
        mappingDAO = new MappingDAOImpl();
        setValuesForMemberFields(mappingDAO, "jdbcTemplate", jdbcTemplate);
    }

    @Test
    public void shouldReturnSuccessfulMessageOnSuccessfulInsertion() throws Exception {
        when(jdbcTemplate.update(sql)).thenReturn(1);

        String result = mappingDAO.saveMapping(mappingName, lookupTable, mappingJson);

        verify(jdbcTemplate, times(1)).update(sql);
        assertEquals("Successfully Added New Mapping", result);
    }

    @Test
    public void shouldThrowErrorOnFail() throws Exception {
        when(jdbcTemplate.update(sql)).thenReturn(0);

        try {
            mappingDAO.saveMapping(mappingName, lookupTable, mappingJson);
        } catch(Exception e) {
            verify(jdbcTemplate, times(1)).update(sql);
            assertEquals("Could not able to add Mapping", e.getMessage());
        }
    }

    @Test
    public void shouldGetExistingMappings() {
        String sql = "SELECT mapping_name FROM mapping";
        Map<String, Object> mapping1 = new HashMap<>();
        Map<String, Object> mapping2 = new HashMap<>();

        mapping1.put("mapping_name", "HTS");
        mapping2.put("mapping_name", "TB");

        List<String> expected = Arrays.asList("HTS","TB");
        List<Map<String, Object>> result = Arrays.asList(mapping1,mapping2);

        when(jdbcTemplate.queryForList(sql)).thenReturn(result);

        assertEquals(expected, mappingDAO.getMappingNames());

        verify(jdbcTemplate, times(1)).queryForList(sql);
    }

    @Test
    public void shouldGetExistingMapping() throws NoMappingFoundException {
        String sql = "SELECT mapping_name, lookup_table, mapping_json FROM mapping WHERE = 'HTS Service'";
        Map<String, Object> HTSMapping = new HashMap<>();

        HTSMapping.put("mapping_name","HTS Service");
        HTSMapping.put("lookup_table","{\"instance\" : \"patient\"}");
        HTSMapping.put("mapping_json","{\"instance\" : {\"patient_id\": \"Asj8X\", \"patient_name\": \"jghTk9\"}}");

        when(jdbcTemplate.queryForMap(sql)).thenReturn(HTSMapping);

        assertEquals(HTSMapping, mappingDAO.getMapping("HTS Service"));

        verify(jdbcTemplate, times(1)).queryForMap(sql);
    }
}