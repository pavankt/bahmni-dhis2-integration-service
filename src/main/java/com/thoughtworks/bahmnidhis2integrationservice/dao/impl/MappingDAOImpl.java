package com.thoughtworks.bahmnidhis2integrationservice.dao.impl;

import com.google.gson.Gson;
import com.thoughtworks.bahmnidhis2integrationservice.dao.MappingDAO;
import com.thoughtworks.bahmnidhis2integrationservice.exception.NoMappingFoundException;
import com.thoughtworks.bahmnidhis2integrationservice.model.Mapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;
import java.util.stream.Collectors;

@Component
public class MappingDAOImpl implements MappingDAO {

    @Autowired
    @Qualifier("jdbcTemplate")
    private JdbcTemplate jdbcTemplate;

    private final static int SUCCESS = 1;

    @Override
    public String saveMapping(String mappingName, String lookupTable, String mappingJson, String currentMapping, String user) throws Exception {
        String currentTime = getCurrentTime();
        String sql = currentMapping.isEmpty() ?
                String.format("INSERT INTO mapping (mapping_name, lookup_table, mapping_json, created_by, date_created) " +
                "VALUES ('%s', '%s', '%s', '%s', '%s')", mappingName, lookupTable, mappingJson, user, currentTime)
                :String.format("UPDATE mapping " +
                    "SET mapping_name='%s', lookup_table='%s', mapping_json='%s', modified_by='%s', date_modified='%s' " +
                    "WHERE mapping_name='%s'", mappingName, lookupTable, mappingJson, user, currentTime, currentMapping);

        int result = jdbcTemplate.update(sql);

        if (result == SUCCESS) {
            return "Successfully Saved Mapping";
        }

        throw new Exception("Could not add Mapping");
    }

    @Override
    public List<String> getMappingNames() {
        String sql = "SELECT mapping_name FROM mapping";
        return jdbcTemplate.queryForList(sql).stream().map(mapping -> mapping.get("mapping_name").toString())
                .collect(Collectors.toList());
    }

    @Override
    public Map<String, Object> getMapping(String mappingName) throws NoMappingFoundException {
        String sql = String.format("SELECT mapping_name, lookup_table, mapping_json FROM mapping WHERE mapping_name= '%s'",mappingName);
        try{
            return jdbcTemplate.queryForMap(sql);
        }catch (EmptyResultDataAccessException e){
            throw new NoMappingFoundException(mappingName);
        }
    }

    @Override
    public String saveMapping(List<Object> mappingsList) throws Exception {
        StringBuilder mappingQueries = new StringBuilder();
        Gson gson = new Gson();
        mappingsList.forEach(mappingObj -> {
            Mapping mapping = gson.fromJson(mappingObj.toString(), Mapping.class);
            String query = getMappingSql(
                    mapping.getMapping_name(),
                    mapping.getLookup_table(),
                    mapping.getMapping_json(),
                    mapping.getCurrent_mapping(),
                    mapping.getUser()
                    );

            mappingQueries.append(query);
        });

        int result = jdbcTemplate.update(mappingQueries.toString());

        if (result == SUCCESS) {
            return "Successfully Imported All Mappings";
        }

        throw new Exception("Could not add Mapping(s)");
    }

    private String getMappingSql(String mappingName, String lookupTable, String mappingJson, String currentMapping, String user) {
        String currentTime = getCurrentTime();
        return StringUtils.isEmpty(currentMapping) ?
                String.format("INSERT INTO mapping (mapping_name, lookup_table, mapping_json, created_by, date_created) " +
                        "VALUES ('%s', '%s', '%s', '%s', '%s');", mappingName, lookupTable, mappingJson, user, currentTime)
                : String.format("UPDATE mapping " +
                "SET mapping_name='%s', lookup_table='%s', mapping_json='%s', modified_by='%s', date_modified='%s' " +
                "WHERE mapping_name='%s';", mappingName, lookupTable, mappingJson, user, currentTime, currentMapping);
    }

    private String getCurrentTime() {
        Date date = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        dateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
        return dateFormat.format(date);
    }
}
