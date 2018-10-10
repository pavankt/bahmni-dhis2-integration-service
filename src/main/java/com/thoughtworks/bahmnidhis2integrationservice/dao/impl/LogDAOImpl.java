package com.thoughtworks.bahmnidhis2integrationservice.dao.impl;

import com.thoughtworks.bahmnidhis2integrationservice.dao.LogDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Component
public class LogDAOImpl implements LogDAO {

    private static final String SUCCESS = "success";
    private static final String PENDING = "pending";
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
            dateInString = getFormattedDateString(maxDateCreated.toString(), DATEFORMAT, DATEFORMAT_IN_WORDS);
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

    private static String getFormattedDateString(String date, String existingFormat, String expectedFormat) {
        return getStringFromDate(getDateFromString(date, existingFormat), expectedFormat);
    }

    private static Date getDateFromString(String date, String format) {
        SimpleDateFormat outputFormat = new SimpleDateFormat(format);
        try {
            return outputFormat.parse(date);
        } catch (ParseException ignored) {

        }
        return new Date(Long.MIN_VALUE);
    }

    private static String getStringFromDate(Date date, String format) {
        SimpleDateFormat outputFormat = new SimpleDateFormat(format);
        return outputFormat.format(date);
    }

}
