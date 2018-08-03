package com.thoughtworks.bahmnidhis2integrationservice.dao.impl;

import com.thoughtworks.bahmnidhis2integrationservice.dao.MappingDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class MappingDAOImpl implements MappingDAO {

    @Autowired
    @Qualifier("jdbcTemplate")
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<String> getMappingNames() {
        String sql = "SELECT DISTINCT mapping_name FROM mapping";
        return jdbcTemplate.queryForList(sql).stream().map(mapping -> mapping.get("mapping_name").toString())
                .collect(Collectors.toList());
    }
}
