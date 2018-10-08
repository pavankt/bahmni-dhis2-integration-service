package com.thoughtworks.bahmnidhis2integrationservice.controller;

import com.thoughtworks.bahmnidhis2integrationservice.service.impl.PreviewServiceImpl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/api")
public class PreviewController {
    @Autowired
    private PreviewServiceImpl previewService;

    public static final String DATE_FORMAT_WITH_24HR_TIME = "yyyy-MM-dd kk:mm:ss";

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @GetMapping(value = "/getDeltaData")
    @ResponseBody
    public Map<String, Object> getDeltaData(String mappingName) {
        SimpleDateFormat dateFormat = new SimpleDateFormat(DATE_FORMAT_WITH_24HR_TIME);

        Map<String, Object> resultObj = new HashMap<>();
        try {
            resultObj.put("result", previewService.getDeltaData(mappingName));
        } catch (BadSqlGrammarException bsge) {
            resultObj.put("error", "There is an error in the preview. Please contact Admin.");
            logger.error(bsge.getMessage());
        }catch (EmptyResultDataAccessException erdae){
            resultObj.put("error", "No mapping specified with the name "+ mappingName);
        }
        resultObj.put("generatedDate", dateFormat.format(new Date()));

        return resultObj;
    }
}
