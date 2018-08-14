package com.thoughtworks.bahmnidhis2integrationservice.util;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class PrivilegeUtil {

  public static final String APP_DHIS2SYNC = "app:dhis2sync";

  @Getter
  @Setter
  private static List<String> availablePrivileges;

  public static boolean hasPrivilege(String priv) {
    System.out.println("Has Privilege checks for " + priv + " presence in " + availablePrivileges
      + " and found the count as " + (availablePrivileges.stream().filter(priv::equals).count() > 0));
    return availablePrivileges
            .stream()
            .filter(priv::equals)
            .count() > 0;
  }

  public static void savePrivileges(Privileges privileges) {
    setAvailablePrivileges(privileges
            .stream()
            .map(Privilege::getName)
            .filter(privilege -> privilege.startsWith(APP_DHIS2SYNC))
            .collect(Collectors.toList()));
    System.out.println("\n\n\nAvailable privileges " + getAvailablePrivileges());
  }

  public static class Privileges extends ArrayList<Privilege> {
  }

  @Getter
  @Setter
  public static class Privilege {
    private String name;
  }

}
