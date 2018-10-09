package com.thoughtworks.bahmnidhis2integrationservice.dao.impl;

import com.thoughtworks.bahmnidhis2integrationservice.util.DateUtil;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.jdbc.core.JdbcTemplate;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.thoughtworks.bahmnidhis2integrationservice.CommonTestHelper.setValuesForMemberFields;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.mockStatic;
import static org.powermock.api.mockito.PowerMockito.verifyStatic;
import static org.powermock.api.mockito.PowerMockito.when;

@RunWith(PowerMockRunner.class)
@PrepareForTest({ZonedDateTime.class, DateUtil.class, LoggerDAOImpl.class})
public class LoggerDAOImplTest {

    @Mock
    private JdbcTemplate jdbcTemplate;

    @Mock
    private ZonedDateTime zonedDateTime;

    @Mock
    private ZoneId zoneId;


    private LoggerDAOImpl loggerDAO;

    @Before
    public void setUp() throws Exception {
        loggerDAO = new LoggerDAOImpl();
        setValuesForMemberFields(loggerDAO, "jdbcTemplate", jdbcTemplate);
    }

    @Test
    public void shouldReturnResultsWhichAreGreaterThanGivenDate() {
        String utcDate = "2018-10-31 13:00:00";
        String serverDate = "2018-10-31 15:00:00";
        String sql = String.format("SELECT log_id, program, synced_by, comments, status, failure_reason, date_created \n" +
                "FROM log \n" +
                "WHERE date_created >= '%s' \n" +
                "AND upper(synced_by) LIKE upper('%%%%') \n" +
                "AND upper(program) LIKE upper('%%%%')\n" +
                "AND log_id > 0\n" +
                "ORDER BY log_id DESC LIMIT 10;", serverDate);

        Map<String, Object> row1 = new HashMap<>();
        Map<String, Object> row2 = new HashMap<>();
        row1.put("date_created", serverDate);
        row1.put("synced_by", "superman");
        row1.put("program_name", "HT Service");
        row2.put("date_created", "2018-11-01 16:00:00");
        row2.put("synced_by", "admin");
        row2.put("program_name", "HT Service");
        List<Map<String, Object>> dbResults = Arrays.asList(row1, row2);

        Map<String, Object> expRow1 = new HashMap<>();
        Map<String, Object> expRow2 = new HashMap<>();
        expRow1.put("date_created", utcDate);
        expRow1.put("synced_by", "superman");
        expRow1.put("program_name", "HT Service");
        expRow2.put("date_created", "2018-11-01 14:00:00");
        expRow2.put("synced_by", "admin");
        expRow2.put("program_name", "HT Service");
        List<Map<String, Object>> expResults = Arrays.asList(expRow1, expRow2);

        mockStatic(ZonedDateTime.class);
        mockStatic(DateUtil.class);

        when(ZonedDateTime.now()).thenReturn(zonedDateTime);
        when(zonedDateTime.getZone()).thenReturn(zoneId);
        when(DateUtil.getDateStringInLocalFromUtc(utcDate, zoneId)).thenReturn(serverDate);
        when(jdbcTemplate.queryForList(sql)).thenReturn(dbResults);
        when(DateUtil.getDateStringInUTC(serverDate, zoneId)).thenReturn(utcDate);
        when(DateUtil.getDateStringInUTC("2018-11-01 16:00:00", zoneId)).thenReturn("2018-11-01 14:00:00");

        List<Map<String, Object>> actualResults = loggerDAO.getLogs(utcDate, "", "", true, 0);

        verifyStatic();
        ZonedDateTime.now();
        verifyStatic();
        DateUtil.getDateStringInLocalFromUtc(utcDate, zoneId);
        verify(jdbcTemplate, times(1)).queryForList(sql);
        verifyStatic();
        DateUtil.getDateStringInUTC(serverDate, zoneId);
        verifyStatic();
        DateUtil.getDateStringInUTC("2018-11-01 16:00:00", zoneId);

        assertEquals(expResults, actualResults);
    }

    @Test
    public void shouldReturnResultsWhichAreBelowToTheGivenDate() {
        String utcDate = "2018-10-31 13:00:00";
        String serverDate = "2018-10-31 15:00:00";
        String sql = String.format("SELECT log_id, program, synced_by, comments, status, failure_reason, date_created \n" +
                "FROM log \n" +
                "WHERE date_created >= '%s' \n" +
                "AND upper(synced_by) LIKE upper('%%%%') \n" +
                "AND upper(program) LIKE upper('%%%%')\n" +
                "AND log_id < 0\n" +
                "ORDER BY log_id DESC LIMIT 10;", serverDate);

        Map<String, Object> row1 = new HashMap<>();
        Map<String, Object> row2 = new HashMap<>();
        row1.put("date_created", serverDate);
        row1.put("synced_by", "superman");
        row1.put("program_name", "HT Service");
        row2.put("date_created", "2018-11-01 14:00:00");
        row2.put("synced_by", "admin");
        row2.put("program_name", "HT Service");
        List<Map<String, Object>> dbResults = Arrays.asList(row1, row2);

        Map<String, Object> expRow1 = new HashMap<>();
        Map<String, Object> expRow2 = new HashMap<>();
        expRow1.put("date_created", utcDate);
        expRow1.put("synced_by", "superman");
        expRow1.put("program_name", "HT Service");
        expRow2.put("date_created", "2018-11-01 12:00:00");
        expRow2.put("synced_by", "admin");
        expRow2.put("program_name", "HT Service");
        List<Map<String, Object>> expResults = Arrays.asList(expRow1, expRow2);

        mockStatic(ZonedDateTime.class);
        mockStatic(DateUtil.class);

        when(ZonedDateTime.now()).thenReturn(zonedDateTime);
        when(zonedDateTime.getZone()).thenReturn(zoneId);
        when(DateUtil.getDateStringInLocalFromUtc(utcDate, zoneId)).thenReturn(serverDate);
        when(jdbcTemplate.queryForList(sql)).thenReturn(dbResults);
        when(DateUtil.getDateStringInUTC(serverDate, zoneId)).thenReturn(utcDate);
        when(DateUtil.getDateStringInUTC("2018-11-01 14:00:00", zoneId)).thenReturn("2018-11-01 12:00:00");

        List<Map<String, Object>> actualResults = loggerDAO.getLogs(utcDate, "", "", false, 0);

        verifyStatic();
        ZonedDateTime.now();
        verifyStatic();
        DateUtil.getDateStringInLocalFromUtc(utcDate, zoneId);
        verify(jdbcTemplate, times(1)).queryForList(sql);
        verifyStatic();
        DateUtil.getDateStringInUTC(serverDate, zoneId);
        verifyStatic();
        DateUtil.getDateStringInUTC("2018-11-01 14:00:00", zoneId);

        assertEquals(expResults, actualResults);
    }

    @Test
    public void shouldReturnResultsWhichAreGreaterThanGivenDateAndWithTheGivenUser() {
        String utcDate = "2018-10-31 13:00:00";
        String serverDate = "2018-10-31 15:00:00";
        String user = "superman";
        String sql = String.format("SELECT log_id, program, synced_by, comments, status, failure_reason, date_created \n" +
                "FROM log \n" +
                "WHERE date_created >= '%s' \n" +
                "AND upper(synced_by) LIKE upper('%%%s%%') \n" +
                "AND upper(program) LIKE upper('%%%%')\n" +
                "AND log_id > 0\n" +
                "ORDER BY log_id DESC LIMIT 10;", serverDate, user);

        Map<String, Object> row1 = new HashMap<>();
        Map<String, Object> row2 = new HashMap<>();
        row1.put("date_created", serverDate);
        row1.put("synced_by", "superman");
        row1.put("program_name", "HT Service");
        row2.put("date_created", "2018-11-01 16:00:00");
        row2.put("synced_by", "superman");
        row2.put("program_name", "HT Service");
        List<Map<String, Object>> dbResults = Arrays.asList(row1, row2);

        Map<String, Object> expRow1 = new HashMap<>();
        Map<String, Object> expRow2 = new HashMap<>();
        expRow1.put("date_created", utcDate);
        expRow1.put("synced_by", "superman");
        expRow1.put("program_name", "HT Service");
        expRow2.put("date_created", "2018-11-01 14:00:00");
        expRow2.put("synced_by", "superman");
        expRow2.put("program_name", "HT Service");
        List<Map<String, Object>> expResults = Arrays.asList(expRow1, expRow2);

        mockStatic(ZonedDateTime.class);
        mockStatic(DateUtil.class);

        when(ZonedDateTime.now()).thenReturn(zonedDateTime);
        when(zonedDateTime.getZone()).thenReturn(zoneId);
        when(DateUtil.getDateStringInLocalFromUtc(utcDate, zoneId)).thenReturn(serverDate);
        when(jdbcTemplate.queryForList(sql)).thenReturn(dbResults);
        when(DateUtil.getDateStringInUTC(serverDate, zoneId)).thenReturn(utcDate);
        when(DateUtil.getDateStringInUTC("2018-11-01 16:00:00", zoneId)).thenReturn("2018-11-01 14:00:00");

        List<Map<String, Object>> actualResults = loggerDAO.getLogs(utcDate, user, "", true, 0);

        verifyStatic();
        ZonedDateTime.now();
        verifyStatic();
        DateUtil.getDateStringInLocalFromUtc(utcDate, zoneId);
        verify(jdbcTemplate, times(1)).queryForList(sql);
        verifyStatic();
        DateUtil.getDateStringInUTC(serverDate, zoneId);
        verifyStatic();
        DateUtil.getDateStringInUTC("2018-11-01 16:00:00", zoneId);

        assertEquals(expResults, actualResults);
    }

    @Test
    public void shouldReturnResultsWhichAreGreaterThanGivenDateAndWithGivenUserAndProgram() {
        String utcDate = "2018-10-31 13:00:00";
        String serverDate = "2018-10-31 15:00:00";
        String user = "superman";
        String programName = "HT Service";
        String sql = String.format("SELECT log_id, program, synced_by, comments, status, failure_reason, date_created \n" +
                "FROM log \n" +
                "WHERE date_created >= '%s' \n" +
                "AND upper(synced_by) LIKE upper('%%%s%%') \n" +
                "AND upper(program) LIKE upper('%%%s%%')\n" +
                "AND log_id > 0\n" +
                "ORDER BY log_id DESC LIMIT 10;", serverDate, user, programName);

        Map<String, Object> row1 = new HashMap<>();
        Map<String, Object> row2 = new HashMap<>();
        row1.put("date_created", serverDate);
        row1.put("synced_by", "superman");
        row1.put("program_name", "HT Service");
        row2.put("date_created", "2018-11-01 16:00:00");
        row2.put("synced_by", "admin");
        row2.put("program_name", "HT Service");
        List<Map<String, Object>> dbResults = Arrays.asList(row1, row2);

        Map<String, Object> expRow1 = new HashMap<>();
        Map<String, Object> expRow2 = new HashMap<>();
        expRow1.put("date_created", utcDate);
        expRow1.put("synced_by", "superman");
        expRow1.put("program_name", "HT Service");
        expRow2.put("date_created", "2018-11-01 14:00:00");
        expRow2.put("synced_by", "admin");
        expRow2.put("program_name", "HT Service");
        List<Map<String, Object>> expResults = Arrays.asList(expRow1, expRow2);

        mockStatic(ZonedDateTime.class);
        mockStatic(DateUtil.class);

        when(ZonedDateTime.now()).thenReturn(zonedDateTime);
        when(zonedDateTime.getZone()).thenReturn(zoneId);
        when(DateUtil.getDateStringInLocalFromUtc(utcDate, zoneId)).thenReturn(serverDate);
        when(jdbcTemplate.queryForList(sql)).thenReturn(dbResults);
        when(DateUtil.getDateStringInUTC(serverDate, zoneId)).thenReturn(utcDate);
        when(DateUtil.getDateStringInUTC("2018-11-01 16:00:00", zoneId)).thenReturn("2018-11-01 14:00:00");

        List<Map<String, Object>> actualResults = loggerDAO.getLogs(utcDate, user, programName, true, 0);

        verifyStatic();
        ZonedDateTime.now();
        verifyStatic();
        DateUtil.getDateStringInLocalFromUtc(utcDate, zoneId);
        verify(jdbcTemplate, times(1)).queryForList(sql);
        verifyStatic();
        DateUtil.getDateStringInUTC(serverDate, zoneId);
        verifyStatic();
        DateUtil.getDateStringInUTC("2018-11-01 16:00:00", zoneId);

        assertEquals(expResults, actualResults);
    }
}
