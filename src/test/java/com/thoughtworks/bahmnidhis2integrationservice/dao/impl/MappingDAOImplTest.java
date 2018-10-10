package com.thoughtworks.bahmnidhis2integrationservice.dao.impl;

import com.thoughtworks.bahmnidhis2integrationservice.exception.NoMappingFoundException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.jdbc.core.JdbcTemplate;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import static com.thoughtworks.bahmnidhis2integrationservice.CommonTestHelper.setValuesForMemberFields;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.doNothing;
import static org.powermock.api.mockito.PowerMockito.mock;
import static org.powermock.api.mockito.PowerMockito.mockStatic;
import static org.powermock.api.mockito.PowerMockito.when;
import static org.powermock.api.mockito.PowerMockito.whenNew;

@RunWith(PowerMockRunner.class)
@PrepareForTest({TimeZone.class, MappingDAOImpl.class})
public class MappingDAOImplTest {

    private MappingDAOImpl mappingDAO;

    @Mock
    private JdbcTemplate jdbcTemplate;

    private String mappingName = "patient_details";
    private String lookupTable = "patient";
    private String user = "superman";
    private String time = "28-10-2018 02:13:10";
    private String mappingJson = "{\"patient_id\": \"Asj8X\", \"patient_name\": \"jghTk9\"}";
    private String sql = String.format("INSERT INTO mapping (mapping_name, lookup_table, mapping_json, created_by, date_created) " +
            "VALUES ('%s', '%s', '%s', '%s', '%s')", mappingName, lookupTable, mappingJson, user, time);

    private String currentMapping = "";

    @Before
    public void setUp() throws Exception {
        mappingDAO = new MappingDAOImpl();
        Date dateMock = mock(Date.class);
        whenNew(Date.class).withNoArguments().thenReturn(dateMock);
        SimpleDateFormat simpleDateFormat = mock(SimpleDateFormat.class);
        whenNew(SimpleDateFormat.class).withArguments("yyyy-MM-dd HH:mm:ss").thenReturn(simpleDateFormat);
        TimeZone timeZone = mock(TimeZone.class);
        mockStatic(TimeZone.class);
        when(TimeZone.getTimeZone("UTC")).thenReturn(timeZone);
        doNothing().when(simpleDateFormat).setTimeZone(timeZone);
        when(simpleDateFormat.format(dateMock)).thenReturn(time);
        setValuesForMemberFields(mappingDAO, "jdbcTemplate", jdbcTemplate);
    }

    @Test
    public void shouldReturnSuccessfulMessageOnSuccessfulInsertion() throws Exception {
        when(jdbcTemplate.update(sql)).thenReturn(1);

        String result = mappingDAO.saveMapping(mappingName, lookupTable, mappingJson, currentMapping, user);

        verify(jdbcTemplate, times(1)).update(sql);
        assertEquals("Successfully Saved Mapping", result);
    }

    @Test
    public void shouldUpdateTableWhenCurrentMappingHasValue() throws Exception {
        currentMapping = "pro_details";
        sql = String.format("UPDATE mapping " +
                "SET mapping_name='%s', lookup_table='%s', mapping_json='%s', modified_by='%s', date_modified='%s' " +
                "WHERE mapping_name='%s'", mappingName, lookupTable, mappingJson, user, time, currentMapping);
        when(jdbcTemplate.update(sql)).thenReturn(1);

        String result = mappingDAO.saveMapping(mappingName, lookupTable, mappingJson, currentMapping, user);

        verify(jdbcTemplate, times(1)).update(sql);
        assertEquals("Successfully Saved Mapping", result);
    }

    @Test
    public void shouldThrowErrorOnFail() throws Exception {
        when(jdbcTemplate.update(sql)).thenReturn(0);

        try {
            mappingDAO.saveMapping(mappingName, lookupTable, mappingJson, currentMapping, user);
        } catch(Exception e) {
            verify(jdbcTemplate, times(1)).update(sql);
            assertEquals("Could not add Mapping", e.getMessage());
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
        String sql = "SELECT mapping_name, lookup_table, mapping_json FROM mapping WHERE mapping_name= 'HTS Service'";
        Map<String, Object> HTSMapping = new HashMap<>();

        HTSMapping.put("mapping_name","HTS Service");
        HTSMapping.put("lookup_table","{\"instance\" : \"patient\"}");
        HTSMapping.put("mapping_json","{\"instance\" : {\"patient_id\": \"Asj8X\", \"patient_name\": \"jghTk9\"}}");

        when(jdbcTemplate.queryForMap(sql)).thenReturn(HTSMapping);

        assertEquals(HTSMapping, mappingDAO.getMapping("HTS Service"));

        verify(jdbcTemplate, times(1)).queryForMap(sql);
    }
}
