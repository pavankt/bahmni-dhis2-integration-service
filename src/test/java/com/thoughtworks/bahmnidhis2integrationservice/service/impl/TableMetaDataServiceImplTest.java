package com.thoughtworks.bahmnidhis2integrationservice.service.impl;

import com.thoughtworks.bahmnidhis2integrationservice.dao.impl.TableMetaDataDAOImpl;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

import java.util.Arrays;
import java.util.List;

import static com.thoughtworks.bahmnidhis2integrationservice.CommonTestHelper.setValuesForMemberFields;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.when;

@RunWith(PowerMockRunner.class)
public class TableMetaDataServiceImplTest {

    private TableMetaDataServiceImpl tableMetaDataService;

    @Mock
    private TableMetaDataDAOImpl tableMetaDataDAO;

    @Before
    public void setUp() throws Exception {
        tableMetaDataService = new TableMetaDataServiceImpl();
        setValuesForMemberFields(tableMetaDataService, "tableMetaDataDAO", tableMetaDataDAO);
    }

    @Test
    public void shouldReturnListOfTableNames() {
        List<String> expectedList = Arrays.asList("patient", "hts_program", "events");
        when(tableMetaDataDAO.getAllTableNames()).thenReturn(expectedList);
        List<String> allTable = tableMetaDataService.getAllTableNames();

        verify(tableMetaDataDAO, times(1)).getAllTableNames();
        Assert.assertEquals(expectedList, allTable);
    }
}