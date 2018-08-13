package com.thoughtworks.bahmnidhis2integrationservice.util;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.modules.junit4.PowerMockRunner;

import java.util.Arrays;
import java.util.List;

import static com.thoughtworks.bahmnidhis2integrationservice.CommonTestHelper.setValuesForMemberFields;
import static org.junit.Assert.assertEquals;

@RunWith(PowerMockRunner.class)
public class PrivilegeUtilTest {

  private PrivilegeUtil privilegeUtil;

  @Before
  public void setUp() throws Exception {
    privilegeUtil = new PrivilegeUtil();
    List<String> privileges = Arrays.asList("test:privilege", "dev:privilege");

    setValuesForMemberFields(privilegeUtil, "availablePrivileges", privileges);
  }

  @Test
  public void shouldSaveGivenSetOfPrivileges() throws Exception {
    assertEquals(PrivilegeUtil.getAvailablePrivileges().get(0), "test:privilege");
  }

  @Test
  public void shouldReturnTrueIfAGivenPrivilegeIsAvailable() throws Exception {
    assertEquals(true, PrivilegeUtil.hasPrivilege("test:privilege"));
  }
}
