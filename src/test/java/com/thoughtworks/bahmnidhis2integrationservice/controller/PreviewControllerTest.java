package com.thoughtworks.bahmnidhis2integrationservice.controller;

import com.thoughtworks.bahmnidhis2integrationservice.service.impl.PreviewServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.jdbc.BadSqlGrammarException;

import java.text.SimpleDateFormat;
import java.util.*;

import static com.thoughtworks.bahmnidhis2integrationservice.CommonTestHelper.setValuesForMemberFields;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.when;
import static org.powermock.api.mockito.PowerMockito.whenNew;

@RunWith(PowerMockRunner.class)
@PrepareForTest({Date.class, SimpleDateFormat.class, PreviewController.class})
public class PreviewControllerTest {
    private PreviewController previewController;

    @Mock
    private PreviewServiceImpl previewService;

    @Mock
    private SimpleDateFormat simpleDateFormatMock;

    @Mock
    private Date dateMock;

    @Mock
    private BadSqlGrammarException badSqlGrammarException;

    @Before
    public void setUp() throws Exception {
        previewController = new PreviewController();
        setValuesForMemberFields(previewController, "previewService", previewService);
    }

    @Test
    public void shouldGetDeltaData() throws Exception {
        String generatedDate = "2018-10-01 15:09:04";

        String mappingName = "someMapping";
        Map<String, Object> expected = new HashMap();

        Map<String, Object> record1 = new HashMap<>();
        Map<String, Object> record2 = new HashMap<>();

        assignValuesToMap(record1, "NAH0000000001", "PSI-ZIMB-NAH", "2018-09-12", "2018-09-08", "ACTIVE", "2018-09-24");
        record1.put("UIC", "KLNTRA190606M");
        record1.put("self_test_outcome", "Positive");

        assignValuesToMap(record2, "NAH0000000002", "PSI-ZIMB-NAH", "2018-08-12", "2018-08-11", "COMPLETED", "2018-09-24");
        record2.put("UIC", "KLSTTA180773F");
        record2.put("self_test_outcome", "Positive");

        expected.put("result", Arrays.asList(record1, record2));
        expected.put("generatedDate", generatedDate);

        when(previewService.getDeltaData(mappingName)).thenReturn((List<Map<String, Object>>) expected.get("result"));
        whenNew(SimpleDateFormat.class).withArguments(PreviewController.DATE_FORMAT_WITH_24HR_TIME).thenReturn(simpleDateFormatMock);
        whenNew(Date.class).withNoArguments().thenReturn(dateMock);

        when(simpleDateFormatMock.format(dateMock)).thenReturn(generatedDate);

        Map<String, Object> actual = previewController.getDeltaData(mappingName);

        assertEquals(actual, expected);

        verify(previewService, times(1)).getDeltaData(mappingName);
    }

    @Test
    public void shouldReturnAHashMapWithKeyErrorWhenMappingIsNotValid() {
        String generatedDate = "2018-10-01 15:09:04";

        String mappingName = "invalidMapping";
        Map<String, Object> expected = new HashMap();

        when(previewService.getDeltaData(mappingName)).thenThrow(badSqlGrammarException);

        Map<String, Object> actual = previewController.getDeltaData(mappingName);

        assertTrue(actual.containsKey("error"));
    }

    private void assignValuesToMap(Map<String, Object> map, String patientIdentifier, String orgUnit, String enrollmentDate, String incidentDate, String enrollmentStatus, String program_start_date) {
        map.put("Patient_Identifier", patientIdentifier);
        map.put("OrgUnit", orgUnit);

        map.put("enrollment_date", enrollmentDate);
        map.put("incident_date", incidentDate);
        map.put("status", "ACTIVE");

        map.put("event_date", "2018-09-27");
        map.put("event_status", enrollmentStatus);
        map.put("program_start_date", program_start_date);
    }
}
