package com.thoughtworks.bahmnidhis2integrationservice.dao.impl;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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

    @Mock
    private List<Map<String, Object>> list = new ArrayList<>();

    @Before
    public void setUp() throws Exception {
        logDAO = new LogDAOImpl();
        setValuesForMemberFields(logDAO, "jdbcTemplate", jdbcTemplate);
    }

    @Test
    public void shouldGetLastSuccessfulSyncDateForAGivenService() {
        String programName = "My Service";
        String sql = String.format("SELECT max(date_created) from log where program = '%s' AND status = 'success';", programName);

        Map<String, Object> map = new HashMap<>();
        map.put("max", "2018-10-03 11:21:32.000000");
        list.add(map);

        when(jdbcTemplate.queryForList(sql)).thenReturn(list);

        String actual = logDAO.getLastSuccessfulSyncDate(programName);

        assertEquals("Wednesday October 03, 2018 11:21:32 AM", actual);
        verify(jdbcTemplate, times(1)).queryForList(sql);
    }

    @Test
    public void shouldReturnEmptyStringForAServiceWhichHasNotYetSyncedAnyData(){
        String programName = "My Service";
        String sql = String.format("SELECT max(date_created) from log where program = '%s' AND status = 'success';", programName);

        Map<String, Object> map = new HashMap<>();
        map.put("max", null);
        list.add(map);

        when(jdbcTemplate.queryForList(sql)).thenReturn(list);

        String actual = logDAO.getLastSuccessfulSyncDate(programName);

        assertEquals("", actual);
        verify(jdbcTemplate, times(1)).queryForList(sql);
    }
}
