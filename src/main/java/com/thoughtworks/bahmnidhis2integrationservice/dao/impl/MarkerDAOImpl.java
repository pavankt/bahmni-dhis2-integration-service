package com.thoughtworks.bahmnidhis2integrationservice.dao.impl;

import com.thoughtworks.bahmnidhis2integrationservice.dao.MarkerDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class MarkerDAOImpl implements MarkerDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void createMarkerEntries(String oldMappingName, String newMappingName) {
        if("".equals(oldMappingName)) {
            createEntries(newMappingName);
        } else {
            updateEntries(oldMappingName, newMappingName);
        }
    }

    private boolean isEntriesNotExists(String programName) {
        String checkForExistence = String.format("SELECT count(*) FROM marker WHERE program_name = '%s'", programName);
        Map<String, Object> existingEntriesCount = jdbcTemplate.queryForMap(checkForExistence);

        return Integer.parseInt(existingEntriesCount.get("count").toString()) == 0;
    }

    private void createEntries(String mappingName) {
        StringBuilder sql = new StringBuilder();
        sql.append("INSERT INTO marker (program_name, category, last_synced_date) VALUES ");
        sql.append(String.format("('%s', 'instance', null),", mappingName));
        sql.append(String.format("('%s', 'enrollment', null),", mappingName));
        sql.append(String.format("('%s', 'event', null)", mappingName));

        jdbcTemplate.update(sql.toString());
    }

    private void updateEntries(String oldMappingName, String newMappingName) {
        if(isEntriesNotExists(newMappingName)) {
             String sql = String.format("UPDATE marker SET program_name='%s' WHERE program_name='%s'"
                     , newMappingName, oldMappingName);
            jdbcTemplate.update(sql);
        }
    }
}
