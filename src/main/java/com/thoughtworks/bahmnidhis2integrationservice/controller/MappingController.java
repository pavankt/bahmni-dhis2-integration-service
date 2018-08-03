package com.thoughtworks.bahmnidhis2integrationservice.controller;

import com.thoughtworks.bahmnidhis2integrationservice.service.impl.MappingServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class MappingController {

    @Autowired
    private MappingServiceImpl mappingService;

    @GetMapping(value = "/getMappingNames")
    @ResponseBody
    public List<String> getAllMappingNames() {
        return mappingService.getMappingNames();
    }
}
