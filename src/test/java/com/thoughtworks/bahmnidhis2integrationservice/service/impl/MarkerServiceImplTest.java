package com.thoughtworks.bahmnidhis2integrationservice.service.impl;

import com.thoughtworks.bahmnidhis2integrationservice.dao.impl.MarkerDAOImpl;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

import static com.thoughtworks.bahmnidhis2integrationservice.CommonTestHelper.setValuesForMemberFields;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.doNothing;

@RunWith(PowerMockRunner.class)
public class MarkerServiceImplTest {

    private MarkerServiceImpl markerService;

    @Mock
    private MarkerDAOImpl markerDAO;

    @Before
    public void setUp() throws Exception {
        markerService = new MarkerServiceImpl();
        setValuesForMemberFields(markerService, "markerDAO", markerDAO);
    }

    @Test
    public void shouldMakeACallToMarkerDAOToCreateEntries() {
        String programName = "Tracker Service";

        doNothing().when(markerDAO).createMarkerEntries(programName);

        markerService.createEntriesForNewService(programName);

        verify(markerDAO, times(1)).createMarkerEntries(programName);
    }
}
