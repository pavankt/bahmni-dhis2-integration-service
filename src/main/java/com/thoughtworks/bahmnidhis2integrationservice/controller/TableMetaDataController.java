package com.thoughtworks.bahmnidhis2integrationservice.controller;

import com.thoughtworks.bahmnidhis2integrationservice.service.impl.TableMetaDataServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class TableMetaDataController {

    @Autowired
    private TableMetaDataServiceImpl tableMetaDataService;

    @GetMapping(value = "/getTables")
    @ResponseBody
    public List<String> getAllTableNames() {
        return tableMetaDataService.getAllTableNames();
    }
}
