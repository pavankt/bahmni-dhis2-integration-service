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
public class SessionUtilTest {

  private SessionUtil sessionUtil;

  @Before
  public void setUp() throws Exception {
    sessionUtil = new SessionUtil();
    List<String> privileges = Arrays.asList("test:privilege", "dev:privilege");

    setValuesForMemberFields(sessionUtil, "availablePrivileges", privileges);
  }

  @Test
  public void shouldSaveGivenSetOfPrivileges() throws Exception {
    assertEquals(SessionUtil.getAvailablePrivileges().get(0), "test:privilege");
  }

  @Test
  public void shouldReturnTrueIfAGivenPrivilegeIsAvailable() throws Exception {
    assertEquals(true, SessionUtil.hasPrivilege("test:privilege"));
  }
}
