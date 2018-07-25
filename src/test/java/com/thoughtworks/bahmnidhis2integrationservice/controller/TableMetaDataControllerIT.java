package com.thoughtworks.bahmnidhis2integrationservice.controller;

import com.thoughtworks.bahmnidhis2integrationservice.AbstractBaseBatchIT;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class TableMetaDataControllerIT extends AbstractBaseBatchIT {

    @Autowired
    private TableMetaDataController tableMetaDataController;

    //TODO : Integration tests are failing in the absence of @Before
    @Override
    @Before
    public void setUp() throws Exception {
    }

    @Test
    public void shouldReturnAllTableNames() {
        List<String> allTableNames = tableMetaDataController.getAllTableNames();

        int expectedTablesCount = 2;
        List<String> expectedTables = Arrays.asList("person_details_default", "patient_identifier");

        assertEquals(expectedTablesCount, allTableNames.size());
        assertTrue(expectedTables.containsAll(allTableNames));
    }

    @Test
    public void shouldReturnAllColumnNamesOfTable() {
        List<String> tableColumns = tableMetaDataController.getAllColumns("patient_identifier");

        int expectedColumnCount = 7;
        List<String> expectedColumn = Arrays.asList("patient_id", "OpenMRS_Identification_Number", "Old_Identification_Number", "Patient_Identifier", "System_ID", "UIC", "PREP_OI_Identifier");

        assertEquals(expectedColumnCount, tableColumns.size());
        assertTrue(expectedColumn.containsAll(tableColumns));
    }

    @Override
    @After
    public void tearDown() throws Exception {
    }
}
