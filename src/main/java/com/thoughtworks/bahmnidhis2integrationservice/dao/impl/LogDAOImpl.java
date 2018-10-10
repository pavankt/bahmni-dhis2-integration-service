package com.thoughtworks.bahmnidhis2integrationservice.dao.impl;

import com.thoughtworks.bahmnidhis2integrationservice.dao.LogDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import static com.thoughtworks.bahmnidhis2integrationservice.util.DateUtil.getDateStringInLocalFromUtc;

@Component
public class LogDAOImpl implements LogDAO {

    private static final String SUCCESS = "success";
    private static final String EMPTY_STATUS = "";

    private static final String DATEFORMAT = "yyyy-MM-dd HH:mm:ss";
    private static final String DATEFORMAT_IN_WORDS = "EEEEEE MMMMMM dd, yyyy hh:mm:ss a";

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public String getLastSuccessfulSyncDate(String mappingName) {

        String dateInString = "";

        String sql = String.format("SELECT max(date_created) from log where program = '%s' AND status = '%s';", mappingName, SUCCESS);
        Object maxDateCreated = jdbcTemplate.queryForList(sql).get(0).get("max");
        if (maxDateCreated != null) {
            try {
                SimpleDateFormat clientDateFormat = new SimpleDateFormat(DATEFORMAT);
                Date date = clientDateFormat.parse(String.valueOf(maxDateCreated));

                clientDateFormat = new SimpleDateFormat(DATEFORMAT_IN_WORDS);
                clientDateFormat.setTimeZone(TimeZone.getTimeZone(ZonedDateTime.now().getZone()));
                dateInString = clientDateFormat.format(date);
            } catch (ParseException e) {}
        }
        return dateInString;
    }

    @Override
    public String getLatestSyncStatus(String mappingName) {

        String sql = String.format("SELECT status from log where program = '%s' ORDER BY date_created desc LIMIT 1;", mappingName);
        List<Map<String, Object>> list = jdbcTemplate.queryForList(sql);
        if (list.isEmpty()) {
            return EMPTY_STATUS;
        }
        return (String) list.get(0).get("status");
    }
}
