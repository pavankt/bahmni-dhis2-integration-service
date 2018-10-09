package com.thoughtworks.bahmnidhis2integrationservice.dao.impl;

import com.google.gson.GsonBuilder;
import com.google.gson.internal.LinkedTreeMap;
import com.thoughtworks.bahmnidhis2integrationservice.dao.PreviewDAO;
import com.thoughtworks.bahmnidhis2integrationservice.model.LookupTable;
import com.thoughtworks.bahmnidhis2integrationservice.model.MappingJson;
import com.thoughtworks.bahmnidhis2integrationservice.util.PreviewUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import static com.thoughtworks.bahmnidhis2integrationservice.util.DateUtil.getDateStringInUTC;

@Component
public class PreviewDAOImpl implements PreviewDAO {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Value("classpath:sql/deltaData.sql")
    private Resource deltaDataResource;

    private String ALIAS_NAME_OF_INSTANCE_TABLE = "instanceTable";
    private String ALIAS_NAME_OF_EVENT_TABLE = "eventsTable";

    @Override
    public List<Map<String, Object>> getDeltaData(String mappingName) {
        String deltaDataSql = "";
        ZoneId zoneId = ZonedDateTime.now().getZone();

        String mappingSql = getMappingQuery(mappingName);

        Map<String, Object> mapping = jdbcTemplate.queryForMap(mappingSql);

        try {
            deltaDataSql = PreviewUtil.convertResourceOutputToString(deltaDataResource);
        } catch (IOException e) {
            e.printStackTrace();
        }

        GsonBuilder builder = new GsonBuilder();
        LookupTable lookupTable = builder.create().fromJson(mapping.get("lookup_table").toString(), LookupTable.class);
        MappingJson mappingJson = builder.create().fromJson(mapping.get("mapping_json").toString(), MappingJson.class);

        StringBuilder instanceFields = removeLastChar(getFields(mappingJson.getInstance(), ALIAS_NAME_OF_INSTANCE_TABLE));
        StringBuilder eventsFields = removeLastChar(getFields(mappingJson.getEvent(), ALIAS_NAME_OF_EVENT_TABLE));

        String sql = String.format(
                deltaDataSql,
                instanceFields.toString(),
                eventsFields.toString(),
                lookupTable.getInstance(),
                mappingName,
                lookupTable.getEnrollments(),
                mappingName,
                lookupTable.getEvent(),
                mappingName
        );

        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql);

        changeDatesToUtc(result, zoneId);

        return result;
    }

    private void changeDatesToUtc(List<Map<String, Object>> result, ZoneId zoneId) {
        List<String> datesInDeltaData = new LinkedList<>();

        datesInDeltaData.add("Prog Enrollment Date Created");
        datesInDeltaData.add("Event Date Created");

        result.forEach(deltaDataRecord ->
            datesInDeltaData.forEach(date -> {
                try {
                    String currentDate = deltaDataRecord.get(date).toString();
                    deltaDataRecord.put(date, getDateStringInUTC(currentDate, zoneId));
                }catch (NullPointerException ignored){}
            })
        );
    }


    private String getMappingQuery(String mappingName) {
        StringBuilder mappingSql = new StringBuilder("SELECT * FROM mapping WHERE mapping_name='");
        mappingSql.append(mappingName);
        mappingSql.append("'");
        return mappingSql.toString();
    }

    private StringBuilder getFields(LinkedTreeMap json, String aliasNameOfTable) {
        StringBuilder fields = new StringBuilder();
        json.keySet().forEach(field -> {
            fields.append(aliasNameOfTable);
            fields.append(".\"");
            fields.append(field);
            fields.append("\",");
        });
        return fields;
    }

    private static StringBuilder removeLastChar(StringBuilder str) {
        return new StringBuilder(str.substring(0, str.length() - 1));
    }
}
