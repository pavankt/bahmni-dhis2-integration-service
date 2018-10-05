package com.thoughtworks.bahmnidhis2integrationservice.service.impl;

import com.thoughtworks.bahmnidhis2integrationservice.dao.impl.PreviewDAOImpl;
import com.thoughtworks.bahmnidhis2integrationservice.service.PreviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class PreviewServiceImpl implements PreviewService {
    @Autowired
    PreviewDAOImpl previewDAO;

    @Override
    public List<Map<String, Object>> getDeltaData(String mappingName) throws BadSqlGrammarException {
        return previewDAO.getDeltaData(mappingName);
    }
}
