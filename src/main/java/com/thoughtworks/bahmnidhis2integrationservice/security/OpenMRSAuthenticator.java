package com.thoughtworks.bahmnidhis2integrationservice.security;

import com.thoughtworks.bahmnidhis2integrationservice.config.AppProperties;
import com.thoughtworks.bahmnidhis2integrationservice.util.PrivilegeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import static com.thoughtworks.bahmnidhis2integrationservice.util.PrivilegeUtil.APP_DHIS2SYNC;

@Component
public class OpenMRSAuthenticator {

    private static final String SESSION = "/session";
    private static final String OPENMRS_SESSION_ID_COOKIE_NAME = "JSESSIONID";

    @Autowired
    private AppProperties appProperties;

    public AuthenticationResponse authenticate(String sessionId) {
        ResponseEntity<OpenMRSResponse> response = callOpenMRS(sessionId);
        HttpStatus status = response.getStatusCode();

        if (status.series() == HttpStatus.Series.SUCCESSFUL) {
            PrivilegeUtil.savePrivileges(response.getBody().getUser().getPrivileges());
            return PrivilegeUtil.hasPrivilege(APP_DHIS2SYNC)?
                    AuthenticationResponse.AUTHORIZED:
                    AuthenticationResponse.UNAUTHORIZED;
        }

        return AuthenticationResponse.NOT_AUTHENTICATED;
    }

    private ResponseEntity<OpenMRSResponse> callOpenMRS(String sessionId) {
        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.add("Cookie", OPENMRS_SESSION_ID_COOKIE_NAME + "=" + sessionId);
        try {
            return new RestTemplate()
                    .exchange(appProperties.getOpenmrsRootUrl() + SESSION,
                            HttpMethod.GET,
                            new HttpEntity<>(null, requestHeaders),
                            OpenMRSResponse.class
                    );
        } catch (HttpClientErrorException exception) {
            return new ResponseEntity<>(exception.getStatusCode());
        }
    }
}
