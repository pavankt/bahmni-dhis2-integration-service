package com.thoughtworks.bahmnidhis2integrationservice.controller;

import com.thoughtworks.bahmnidhis2integrationservice.BahmniDhis2IntegrationServiceApplication;
import com.thoughtworks.bahmnidhis2integrationservice.SystemPropertyActiveProfileResolver;
import com.thoughtworks.bahmnidhis2integrationservice.exception.NoMappingFoundException;
import model.MappingDetails;
import org.junit.After;
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

    private static final int MARKER_ENTRIES = 3;

    @Autowired
    private MappingController mappingController;

    @Qualifier("jdbcTemplate")
    @Autowired
    protected JdbcTemplate jdbcTemplate;

    @Test
    @Sql(scripts = {"classpath:data/mapping_marker.sql"})
    public void shouldGetAllMappingNames() {
        Map<String, MappingDetails> expected = new HashMap<>();
        expected.put("HTS Service", new MappingDetails("2018-10-03 11:21:32.0", "success"));
        expected.put("TB Service", new MappingDetails("2018-10-04 11:21:32.0", "success"));

        Map<String, MappingDetails> mappings = mappingController.getAllMappingNames();

        assertEquals(expected, mappings);
        truncateMapping();
        truncateMarker();
    }

    @Test
    public void shouldReturnSuccessMessageOnSuccessOfAddMapping() throws Exception {
        Map<String, String> params = new HashMap<>();
        params.put("mappingName", "HTS Service");
        params.put("lookupTable", "{\"instance\" : \"patient\"}");
        params.put("mappingJson", "{\"patient_id\": \"Asj8X\", \"patient_name\": \"jghTk9\"}");
        params.put("currentMapping", "");
        params.put("user", "superman");

        String expectedMessage = "Successfully Saved Mapping";

        Map<String, String> actualMessage = mappingController.saveMappings(params);

        String checkForExistence = String.format("SELECT count(*) FROM marker WHERE program_name = '%s'",
                                                params.get("mappingName"));
        Map<String, Object> markerEntriesCount = jdbcTemplate.queryForMap(checkForExistence);

        assertEquals(expectedMessage, actualMessage.get("data"));
        assertEquals(MARKER_ENTRIES, Integer.parseInt(markerEntriesCount.get("count").toString()));
        truncateMapping();
    }

    @Test
    @Sql(scripts = {"classpath:data/mapping_marker.sql"})
    public void shouldUpdateMappingNameWithCurrentMappingOnEdit() throws Exception {
        Map<String, String> params = new HashMap<>();
        params.put("mappingName", "Edit Service Name");
        params.put("lookupTable", "{\"instance\" : \"patient\"}");
        params.put("mappingJson", "{\"patient_id\": \"Asj8X\", \"patient_name\": \"jghTk9\"}");
        params.put("currentMapping", "HTS Service");
        params.put("user", "superman");

        String expectedMessage = "Successfully Saved Mapping";

        Map<String, String> actualMessage = mappingController.saveMappings(params);

        List<String> allMappingNames = jdbcTemplate.queryForList("SELECT mapping_name FROM mapping").stream()
                .map(mapping -> mapping.get("mapping_name").toString())
                .collect(Collectors.toList());

        String checkForExistence = String.format("SELECT count(*) FROM marker WHERE program_name = '%s'",
                params.get("mappingName"));
        Map<String, Object> markerEntriesCount = jdbcTemplate.queryForMap(checkForExistence);

        assertEquals(expectedMessage, actualMessage.get("data"));
        assertEquals(allMappingNames.size(), 2);
        assertTrue(Arrays.asList("TB Service","Edit Service Name").containsAll(allMappingNames));
        assertEquals(MARKER_ENTRIES, Integer.parseInt(markerEntriesCount.get("count").toString()));

        truncateMapping();
        truncateMarker();
    }

    @Test(expected = NoMappingFoundException.class)
    public void shouldThrowErrorIfNoMappingExist() throws NoMappingFoundException {
        mappingController.getMapping("someMapping");
    }

    private void truncateMapping() {
        jdbcTemplate.execute("DROP TABLE IF EXISTS mapping CASCADE; " +
                "CREATE TABLE public.mapping(" +
                "mapping_name text," +
                "lookup_table json, " +
                "mapping_json json, " +
                "created_by text, " +
                "date_created timestamp, " +
                "modified_by text, " +
                "date_modified timestamp)");
    }

    private void truncateMarker() {
        jdbcTemplate.execute("DROP TABLE IF EXISTS marker CASCADE;\n" +
                "CREATE TABLE \"public\".\"marker\"\n" +
                "(\n" +
                "  marker_id        SERIAL NOT NULL\n" +
                "    CONSTRAINT marker_pkey\n" +
                "    PRIMARY KEY,\n" +
                "  program_name     TEXT,\n" +
                "  category         TEXT,\n" +
                "  last_synced_date TIMESTAMP\n" +
                ");");
    }

    private void truncateLog() {
        jdbcTemplate.execute("DROP TABLE IF EXISTS log CASCADE;\n" +
                "CREATE TABLE \"public\".\"log\"(\n" +
                "log_id SERIAL PRIMARY KEY,\n" +
                "program text,\n" +
                "synced_by text,\n" +
                "comments text,\n" +
                "status text,\n" +
                "status_info text,\n" +
                "date_created TIMESTAMP\n" +
                ");");
    }

    @After
    public void tearDown() {
        truncateMarker();
        truncateLog();
    }
}
