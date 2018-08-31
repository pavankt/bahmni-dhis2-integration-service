package com.thoughtworks.bahmnidhis2integrationservice.dao.impl;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.HashMap;
import java.util.Map;

import static com.thoughtworks.bahmnidhis2integrationservice.CommonTestHelper.setValuesForMemberFields;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.when;

@RunWith(PowerMockRunner.class)
public class MarkerDAOImplTest {

    private MarkerDAOImpl markerDAO;

    @Mock
    private JdbcTemplate jdbcTemplate;

    @Before
    public void setUp() throws Exception {
        markerDAO = new MarkerDAOImpl();
        setValuesForMemberFields(markerDAO, "jdbcTemplate", jdbcTemplate);
    }

    @Test
    public void shouldInsertEntriesForNewService() {
        String programName = "Dummabus Service";
        Map<String, Object> entriesCount = new HashMap<>();
        entriesCount.put("count", 0);

        StringBuilder sql = new StringBuilder();
        sql.append("INSERT INTO marker (program_name, category, last_synced_date) VALUES ");
        sql.append(String.format("('%s', 'instance', null),", programName));
        sql.append(String.format("('%s', 'enrollment', null),", programName));
        sql.append(String.format("('%s', 'event', null)", programName));
        String existenceCheckSql = String.format("SELECT count(*) FROM marker WHERE program_name = '%s'", programName);

        when(jdbcTemplate.queryForMap(existenceCheckSql)).thenReturn(entriesCount);
        when(jdbcTemplate.update(sql.toString())).thenReturn(3);

        markerDAO.createMarkerEntries(programName);

        verify(jdbcTemplate, times(1)).queryForMap(existenceCheckSql);
        verify(jdbcTemplate,times(1)).update(sql.toString());
    }

    @Test
    public void shouldNotInsertEntriesWhenServiceIsAlreadyExists() {
        String programName = "Dummabus Service";
        Map<String, Object> entriesCount = new HashMap<>();
        entriesCount.put("count", 3);

        StringBuilder sql = new StringBuilder();
        sql.append("INSERT INTO marker (program_name, category, last_synced_date) VALUES ");
        sql.append(String.format("('%s', 'instance', null),", programName));
        sql.append(String.format("('%s', 'enrollment', null),", programName));
        sql.append(String.format("('%s', 'event', null)", programName));
        String existenceCheckSql = String.format("SELECT count(*) FROM marker WHERE program_name = '%s'", programName);

        when(jdbcTemplate.queryForMap(existenceCheckSql)).thenReturn(entriesCount);

        markerDAO.createMarkerEntries(programName);

        verify(jdbcTemplate, times(1)).queryForMap(existenceCheckSql);
        verify(jdbcTemplate,times(0)).update(sql.toString());
    }
}
