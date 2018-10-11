package com.thoughtworks.bahmnidhis2integrationservice.dao.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;

import static com.thoughtworks.bahmnidhis2integrationservice.util.DateUtil.getDateStringInLocalFromUtc;
import static com.thoughtworks.bahmnidhis2integrationservice.util.DateUtil.getDateStringInUTC;

@Component
public class LoggerDAOImpl {

    @Autowired
    @Qualifier("jdbcTemplate")
    private JdbcTemplate jdbcTemplate;

    private static final String DATE_CREATED = "date_created";
    private static final String SUCCESS = "success";
    private static final String EMPTY_STATUS = "";


    public List<Map<String, Object>> getLogs(String date, String user, String service, boolean getAbove, int logId) {
        ZoneId zoneId = ZonedDateTime.now().getZone();
        String serverDate = getDateStringInLocalFromUtc(date, zoneId);
        String sql = String.format(getSql(getAbove), serverDate, user, service, logId);

        List<Map<String, Object>> logs = jdbcTemplate.queryForList(sql);
        changeDateToUtc(logs, zoneId);
        return logs;
    }

    public String getLastSuccessfulSyncDateInUTC(String mappingName) {

        String dateInString = "";

        String sql = String.format("SELECT max(date_created) from log where program = '%s' AND status = '%s';", mappingName, SUCCESS);
        Object maxDateCreated = jdbcTemplate.queryForList(sql).get(0).get("max");
        if (maxDateCreated != null) {
            dateInString = getDateStringInUTC(String.valueOf(maxDateCreated), ZonedDateTime.now().getZone());
        }
        return dateInString;
    }

    public String getLatestSyncStatus(String mappingName) {

        String sql = String.format("SELECT status from log where program = '%s' ORDER BY date_created desc LIMIT 1;", mappingName);
        List<Map<String, Object>> list = jdbcTemplate.queryForList(sql);
        if (list.isEmpty()) {
            return EMPTY_STATUS;
        }
        return (String) list.get(0).get("status");
    }

    private void changeDateToUtc(List<Map<String, Object>> logs, ZoneId zoneId) {
        logs.forEach(log -> {
            String currentDate = log.get(DATE_CREATED).toString();
            log.put(DATE_CREATED, getDateStringInUTC(currentDate, zoneId));
        });
    }

    private String getSql(boolean getAbove) {
        if (getAbove) {
            return getPrevPageSql();
        }
        return getNextPageSql();
    }

    private String getPrevPageSql() {
        return "SELECT log_id, program, synced_by, comments, status, status_info, date_created \n" +
                "FROM log \n" +
                "WHERE date_created >= '%s' \n" +
                "AND upper(synced_by) LIKE upper('%%%s%%') \n" +
                "AND upper(program) LIKE upper('%%%s%%')\n" +
                "AND log_id > %s\n" +
                "ORDER BY log_id DESC LIMIT 10;";
    }

    private String getNextPageSql() {
        return "SELECT log_id, program, synced_by, comments, status, status_info, date_created \n" +
                "FROM log \n" +
                "WHERE date_created >= '%s' \n" +
                "AND upper(synced_by) LIKE upper('%%%s%%') \n" +
                "AND upper(program) LIKE upper('%%%s%%')\n" +
                "AND log_id < %s\n" +
                "ORDER BY log_id DESC LIMIT 10;";
    }
}
