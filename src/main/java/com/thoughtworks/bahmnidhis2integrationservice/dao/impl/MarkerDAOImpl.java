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
    public void createMarkerEntries(String programName) {
        if(isEntriesNotExists(programName)) {
            StringBuilder sql = new StringBuilder();
            sql.append("INSERT INTO marker (program_name, category, last_synced_date) VALUES ");
            sql.append(String.format("('%s', 'instance', null),", programName));
            sql.append(String.format("('%s', 'enrollment', null),", programName));
            sql.append(String.format("('%s', 'event', null)", programName));

            jdbcTemplate.update(sql.toString());
        }
    }

    private boolean isEntriesNotExists(String programName) {
        String checkForExistence = String.format("SELECT count(*) FROM marker WHERE program_name = '%s'", programName);
        Map<String, Object> existingEntriesCount = jdbcTemplate.queryForMap(checkForExistence);

        return Integer.parseInt(existingEntriesCount.get("count").toString()) == 0;
    }
}
