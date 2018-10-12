package com.thoughtworks.bahmnidhis2integrationservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Mapping {
    private String mapping_name;
    private String current_mapping;
    private String lookup_table;
    private String mapping_json;
    private String user;
}
