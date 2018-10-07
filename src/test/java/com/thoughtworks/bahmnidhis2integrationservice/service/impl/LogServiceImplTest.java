package com.thoughtworks.bahmnidhis2integrationservice.service.impl;

import com.thoughtworks.bahmnidhis2integrationservice.dao.impl.LogDAOImpl;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

import static com.thoughtworks.bahmnidhis2integrationservice.CommonTestHelper.setValuesForMemberFields;
import static org.mockito.Mockito.*;

@RunWith(PowerMockRunner.class)
public class LogServiceImplTest {

    private LogServiceImpl logService;

    @Mock
    private LogDAOImpl logDAO;

    @Before
    public void setUp() throws Exception {
        logService = new LogServiceImpl();
        setValuesForMemberFields(logService, "logDAO", logDAO);
    }

    @Test
    public void shouldMakeACallToMarkerDAOToCreateEntries() {
        String mappingName = "My service";

        when(logDAO.getLastSuccessfulSyncDate(mappingName)).thenReturn("2018-10-03 11:21:32.000000");

        logService.getSyncDateForService(mappingName);

        verify(logDAO, times(1)).getLastSuccessfulSyncDate(mappingName);
    }
}
