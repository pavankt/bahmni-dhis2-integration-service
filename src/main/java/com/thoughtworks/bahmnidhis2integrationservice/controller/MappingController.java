package com.thoughtworks.bahmnidhis2integrationservice.controller;

import com.thoughtworks.bahmnidhis2integrationservice.exception.NoMappingFoundException;
import com.thoughtworks.bahmnidhis2integrationservice.service.impl.LogServiceImpl;
import com.thoughtworks.bahmnidhis2integrationservice.service.impl.MappingServiceImpl;
import com.thoughtworks.bahmnidhis2integrationservice.service.impl.MarkerServiceImpl;
import model.MappingDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/api")
public class MappingController {

    @Autowired
    private MappingServiceImpl mappingService;

    @Autowired
    private MarkerServiceImpl markerService;

    @Autowired
    private LogServiceImpl logService;

    @PutMapping(value = "/saveMapping")
    @ResponseBody
    public Map<String, String> saveMappings(@RequestBody Map<String, String> params) throws Exception {
        String response = mappingService.saveMapping(params.get("mappingName"),
                                                     params.get("lookupTable"),
                                                     params.get("mappingJson"),
                                                     params.get("currentMapping"),
                                                     params.get("user"));

        markerService.createEntriesForNewService(params.get("currentMapping"), params.get("mappingName"));

        Map<String, String> responseObj = new HashMap<>();

        responseObj.put("data", response);

        return responseObj;
    }

    @GetMapping(value = "/getMappingNames")
    @ResponseBody
    public Map<String, MappingDetails> getAllMappingNames() {

        Map<String, MappingDetails> response = new HashMap<>();

        List<String> mappingNames = mappingService.getMappingNames();
        mappingNames.forEach(mapping -> {
            MappingDetails mappingDetails = new MappingDetails(logService.getSyncDateForService(mapping), "");
            response.put(mapping, mappingDetails);
        });

        return response;
    }

    @GetMapping(value = "/getMapping")
    @ResponseBody
    public Map<String, Object> getMapping(String mappingName) throws NoMappingFoundException {
        return mappingService.getMapping(mappingName);
    }
}
