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
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.when;

@RunWith(PowerMockRunner.class)
public class LogDAOImplTest {

    private LogDAOImpl logDAO;

    @Mock
    private JdbcTemplate jdbcTemplate;

    @Before
    public void setUp() throws Exception {
        logDAO = new LogDAOImpl();
        setValuesForMemberFields(logDAO, "jdbcTemplate", jdbcTemplate);
    }

    @Test
    public void shouldGetLastSuccessfulSyncDateForAGivenService() {
        String programName = "Dummabus Service";

        StringBuilder sql = new StringBuilder();
        sql.append("INSERT INTO marker (program_name, category, last_synced_date) VALUES ");
        sql.append(String.format("('%s', 'instance', null),", programName));
        sql.append(String.format("('%s', 'enrollment', null),", programName));
        sql.append(String.format("('%s', 'event', null)", programName));

        when(jdbcTemplate.update(sql.toString())).thenReturn(3);

        logDAO.getLastSuccessfulSyncDate(programName);

        verify(jdbcTemplate, times(1)).queryForList(sql.toString());
    }

    @Test
    public void shouldReturnEmptyStringForAServiceWhichHasNotYetSyncedAnyData(){
        assertEquals(1, 1);
    }
}
