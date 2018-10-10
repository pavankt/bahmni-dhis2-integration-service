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
    private static final String EMPTY_STATUS = "";

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public String getLastSuccessfulSyncDate(String mappingName) {

        String dateInString = "";

        String sql = String.format("SELECT max(date_created) from log where program = '%s' AND status = '%s';", mappingName, SUCCESS);
        Object maxDateCreated = jdbcTemplate.queryForList(sql).get(0).get("max");
        if (maxDateCreated != null) {
            dateInString = String.valueOf(maxDateCreated);
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
