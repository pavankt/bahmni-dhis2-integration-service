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

    private final static String DATE_CREATED = "date_created";

    public List<Map<String, Object>> getLogs(String date, String user, String service, boolean getAbove, int logId) {
        ZoneId zoneId = ZonedDateTime.now().getZone();
        String serverDate = getDateStringInLocalFromUtc(date, zoneId);
        String sql = String.format(getSql(getAbove), serverDate, user, service, logId);

        List<Map<String, Object>> logs = jdbcTemplate.queryForList(sql);
        changeDateToUtc(logs, zoneId);
        return logs;
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
