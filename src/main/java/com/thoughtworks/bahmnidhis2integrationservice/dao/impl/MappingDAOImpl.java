package com.thoughtworks.bahmnidhis2integrationservice.dao.impl;

import com.thoughtworks.bahmnidhis2integrationservice.dao.MappingDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MappingDAOImpl implements MappingDAO {

    @Autowired
    @Qualifier("jdbcTemplate")
    private JdbcTemplate jdbcTemplate;

    private final static int SUCCESS = 1;

    @Override
    public String saveMapping(String mappingName, String lookupTable, String mappingJson) throws Exception {
        String sql = String.format("INSERT INTO mapping (mapping_name, lookup_table, mapping_json) " +
                "VALUES ('%s', '%s', '%s')", mappingName, lookupTable, mappingJson);

        int result = jdbcTemplate.update(sql);

        if (result == SUCCESS) {
            return "Successfully Added New Mapping";
        }

        throw new Exception("Could not able to add Mapping");
    }

    @Override
    public List<String> getMappingNames() {
        String sql = "SELECT mapping_name FROM mapping";
        return jdbcTemplate.queryForList(sql).stream().map(mapping -> mapping.get("mapping_name").toString())
                .collect(Collectors.toList());
    }
}
