package com.thoughtworks.bahmnidhis2integrationservice.controller;

import com.thoughtworks.bahmnidhis2integrationservice.service.impl.MappingServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class MappingController {

    @Autowired
    private MappingServiceImpl mappingService;

    @PutMapping(value = "/addMapping")
    @ResponseBody
    public Map<String, String> saveMappings(@RequestBody Map<String, String> params) throws Exception {
        String response = mappingService.saveMapping(params.get("mappingName"),params.get("lookupTable"), params.get("mappingJson"));

        Map<String, String> responseObj = new HashMap<>();

        responseObj.put("data", response);

        return responseObj;
    }

    @GetMapping(value = "/getMappingNames")
    @ResponseBody
    public List<String> getAllMappingNames() {
        return mappingService.getMappingNames();
    }
}
