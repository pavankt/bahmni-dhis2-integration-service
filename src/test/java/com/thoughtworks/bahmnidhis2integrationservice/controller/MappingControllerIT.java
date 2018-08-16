package com.thoughtworks.bahmnidhis2integrationservice.controller;

import com.thoughtworks.bahmnidhis2integrationservice.BahmniDhis2IntegrationServiceApplication;
import com.thoughtworks.bahmnidhis2integrationservice.SystemPropertyActiveProfileResolver;
import com.thoughtworks.bahmnidhis2integrationservice.exception.NoMappingFoundException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = BahmniDhis2IntegrationServiceApplication.class)
@ActiveProfiles(profiles = "test", resolver = SystemPropertyActiveProfileResolver.class)
public class MappingControllerIT{

    @Autowired
    private MappingController mappingController;

    @Qualifier("jdbcTemplate")
    @Autowired
    protected JdbcTemplate jdbcTemplate;


    @Test
    @Sql(scripts = {"classpath:mappingData/mapping.sql"})
    public void shouldGetAllMappingNames() {
        List<String> mappingNames = mappingController.getAllMappingNames();

        int expectedRows = 2;
        List<String> expectedList = Arrays.asList("HTS Service","TB Service");

        System.out.println(mappingNames);
        assertEquals(expectedRows, mappingNames.size());
        assertTrue(mappingNames.containsAll(expectedList));
    }

    @Test
    public void shouldReturnSuccessMessageOnSuccessOfAddMapping() throws Exception {
        Map<String, String> params = new HashMap<>();
        params.put("mappingName", "HTS Service");
        params.put("lookupTable", "{\"instance\" : \"patient\"}");
        params.put("mappingJson", "{\"patient_id\": \"Asj8X\", \"patient_name\": \"jghTk9\"}");
        params.put("currentMapping", "");

        String expectedMessage = "Successfully Added New Mapping";

        Map<String, String> actualMessage = mappingController.saveMappings(params);

        assertEquals(expectedMessage, actualMessage.get("data"));

        truncateMapping();
    }

    @Test
    @Sql(scripts = {"classpath:mappingData/mapping.sql"})
    public void shouldUpdateMappingNameWithCurrentMappingOnEdit() throws Exception {
        Map<String, String> params = new HashMap<>();
        params.put("mappingName", "Edit Service Name");
        params.put("lookupTable", "{\"instance\" : \"patient\"}");
        params.put("mappingJson", "{\"patient_id\": \"Asj8X\", \"patient_name\": \"jghTk9\"}");
        params.put("currentMapping", "HTS Service");

        String expectedMessage = "Successfully Added New Mapping";

        Map<String, String> actualMessage = mappingController.saveMappings(params);

        List<String> allMappingNames = jdbcTemplate.queryForList("SELECT mapping_name FROM mapping").stream()
                .map(mapping -> mapping.get("mapping_name").toString())
                .collect(Collectors.toList());

        assertEquals(expectedMessage, actualMessage.get("data"));
        assertEquals(allMappingNames.size(), 2);
        System.out.println(allMappingNames);
        assertTrue(Arrays.asList("TB Service","Edit Service Name").containsAll(allMappingNames));

        truncateMapping();
    }

    private void truncateMapping() {
        jdbcTemplate.execute("DROP TABLE IF EXISTS mapping CASCADE; " +
                "CREATE TABLE public.mapping(" +
                "mapping_name text," +
                "lookup_table json, " +
                "mapping_json json, " +
                "created_by text, " +
                "created_date date, " +
                "modifed_by text, " +
                "modifed_date date)");
    }

    @Test(expected = NoMappingFoundException.class)
    public void shouldThrowErrorIfNoMappingExist() throws NoMappingFoundException {
        mappingController.getMapping("someMapping");
    }
}
