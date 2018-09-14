package com.thoughtworks.bahmnidhis2integrationservice.dao.impl;

import com.thoughtworks.bahmnidhis2integrationservice.dao.MappingDAO;
import com.thoughtworks.bahmnidhis2integrationservice.exception.NoMappingFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

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
            return "Successfully Added New Mapping";
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

    private String getCurrentTime() {
        Date date = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        dateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
        return dateFormat.format(date);
    }
}
