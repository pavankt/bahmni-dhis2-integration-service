package com.thoughtworks.bahmnidhis2integrationservice.util;

import com.thoughtworks.bahmnidhis2integrationservice.security.Privilege;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class PrivilegeUtil {

  public static final String APP_DHIS2SYNC = "app:dhis2sync";

  @Getter
  @Setter
  private static List<String> availablePrivileges = new ArrayList<>();

  public static boolean hasPrivilege(String priv) {
    return availablePrivileges
            .stream()
            .filter(priv::equals)
            .count() > 0;
  }

  public static void savePrivileges(List<Privilege> privileges) {
    setAvailablePrivileges(privileges
            .stream()
            .map(Privilege::getDisplay)
            .filter(privilege -> privilege.startsWith(APP_DHIS2SYNC))
            .collect(Collectors.toList()));
  }
}
