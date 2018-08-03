package com.thoughtworks.bahmnidhis2integrationservice.dao.impl;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.thoughtworks.bahmnidhis2integrationservice.CommonTestHelper.setValuesForMemberFields;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.when;

@RunWith(PowerMockRunner.class)
public class MappingDAOImplTest {

    private MappingDAOImpl mappingDAOImpl;

    @Mock
    private JdbcTemplate jdbcTemplate;

    @Before
    public void setUp() throws Exception {
        mappingDAOImpl = new MappingDAOImpl();
        setValuesForMemberFields(mappingDAOImpl, "jdbcTemplate", jdbcTemplate);
    }

    @Test
    public void shouldGetExistingMappings() {
        String sql = "SELECT DISTINCT mapping_name FROM mapping";
        Map<String, Object> mapping1 = new HashMap<>();
        Map<String, Object> mapping2 = new HashMap<>();

        mapping1.put("mapping_name", "HTS");

        mapping2.put("mapping_name", "TB");

        List<String> expected = Arrays.asList("HTS","TB");

        List<Map<String, Object>> result = Arrays.asList(mapping1,mapping2);

        when(jdbcTemplate.queryForList(sql)).thenReturn(result);

        Assert.assertEquals(expected, mappingDAOImpl.getMappingNames());

        verify(jdbcTemplate, times(1)).queryForList(sql);
    }
}