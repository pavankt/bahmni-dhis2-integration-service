package com.thoughtworks.bahmnidhis2integrationservice.controller;

import com.thoughtworks.bahmnidhis2integrationservice.exception.NoMappingFoundException;
import com.thoughtworks.bahmnidhis2integrationservice.service.impl.MappingServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/api")
public class MappingController {

    @Autowired
    private MappingServiceImpl mappingService;

    @PutMapping(value = "/saveMapping")
    @ResponseBody
    public Map<String, String> saveMappings(@RequestBody Map<String, String> params) throws Exception {
        String response = mappingService.saveMapping(params.get("mappingName"),
                                                     params.get("lookupTable"),
                                                     params.get("mappingJson"),
                                                     params.get("currentMapping"));

        Map<String, String> responseObj = new HashMap<>();

        responseObj.put("data", response);

        return responseObj;
    }

    @GetMapping(value = "/getMappingNames")
    @ResponseBody
    public List<String> getAllMappingNames() {
        return mappingService.getMappingNames();
    }

    @GetMapping(value = "/getMapping")
    @ResponseBody
    public Map<String, Object> getMapping(String mappingName) throws NoMappingFoundException {
        return mappingService.getMapping(mappingName);
    }
}
