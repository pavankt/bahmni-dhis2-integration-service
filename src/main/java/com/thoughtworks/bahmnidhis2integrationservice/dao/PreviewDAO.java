package com.thoughtworks.bahmnidhis2integrationservice.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public interface PreviewDAO {
    List<Map<String, Object>> getDeltaData(String deltaDataSql) throws SQLException;
}
