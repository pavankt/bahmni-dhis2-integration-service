package com.thoughtworks.bahmnidhis2integrationservice.interceptor;

import com.thoughtworks.bahmnidhis2integrationservice.config.AppProperties;
import com.thoughtworks.bahmnidhis2integrationservice.security.OpenMRSAuthenticator;
import lombok.SneakyThrows;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.powermock.modules.junit4.PowerMockRunner;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

import static com.thoughtworks.bahmnidhis2integrationservice.security.AuthenticationResponse.AUTHORIZED;
import static com.thoughtworks.bahmnidhis2integrationservice.security.AuthenticationResponse.NOT_AUTHENTICATED;
import static com.thoughtworks.bahmnidhis2integrationservice.security.AuthenticationResponse.UNAUTHORIZED;
import static org.mockito.Mockito.*;

@RunWith(PowerMockRunner.class)
public class AuthenticationInterceptorTest {

  @Mock
  private HttpServletRequest httpServletRequestMock;

  @Mock
  private HttpServletResponse httpServletResponseMock;

  @Mock
  private AppProperties appProperties;

  @Mock
  private OpenMRSAuthenticator authenticator;

  @Mock
  private PrintWriter printWriter;

  private AuthenticationInterceptor authenticationInterceptor;

  public static final String REPORTING_COOKIE_NAME = "reporting_session";

  @Before
  public void setUp() throws Exception {
    authenticationInterceptor = new AuthenticationInterceptor(authenticator, appProperties);
  }

  @Test
  @SneakyThrows
  public void shouldAuthenticateIfReportingSessionIdIsValidatedByOpenMRS() {
    String COOKIE_VALUE = "SOME_REPORTING_SESSION_ID";
    Cookie cookie = new Cookie(REPORTING_COOKIE_NAME, COOKIE_VALUE);
    Cookie[] cookies = new Cookie[1];
    cookies[0] = cookie;

    when(httpServletRequestMock.getCookies()).thenReturn(cookies);
    when(authenticator.authenticate(COOKIE_VALUE)).thenReturn(AUTHORIZED);

    boolean response = authenticationInterceptor.preHandle(httpServletRequestMock, httpServletResponseMock, new Object());

    verify(authenticator, times(1)).authenticate(COOKIE_VALUE);
    Assert.assertTrue(response);

  }

  @Test
  @SneakyThrows
  public void shouldNotAuthenticateIfReportingSessionIdIsValidatedByOpenMRSButDoesNotHavePrivileges() {
    String COOKIE_VALUE = "SOME_REPORTING_SESSION_ID";
    Cookie cookie = new Cookie(REPORTING_COOKIE_NAME, COOKIE_VALUE);
    Cookie[] cookies = new Cookie[1];
    cookies[0] = cookie;

    when(httpServletRequestMock.getCookies()).thenReturn(cookies);
    when(authenticator.authenticate(COOKIE_VALUE)).thenReturn(UNAUTHORIZED);

    boolean response = authenticationInterceptor.preHandle(httpServletRequestMock, httpServletResponseMock, new Object());

    verify(authenticator, times(1)).authenticate(COOKIE_VALUE);
    Assert.assertFalse(response);

  }

  @Test
  @SneakyThrows
  public void shouldNotAuthenticateWithoutReportingSessionIdByOpenMRSAndRedirectToBahmniHomePage() {
    when(httpServletRequestMock.getCookies()).thenReturn(null);
    when(httpServletResponseMock.getWriter()).thenReturn(printWriter);

    when(appProperties.getBahmniLoginUrl()).thenReturn("/bahmni/home/#/login?showLoginMessage");

    when(httpServletRequestMock.getRequestURL()).thenReturn(new StringBuffer("http://localhost/dhis-integration/bundle.js"));
    when(httpServletRequestMock.getQueryString()).thenReturn(null);

    boolean response = authenticationInterceptor.preHandle(httpServletRequestMock, httpServletResponseMock, new Object());

    verify(authenticator, times(0)).authenticate(any());
    verify(printWriter).write("Please login to continue");
    verify(httpServletResponseMock).sendRedirect("/bahmni/home/#/login?showLoginMessage&from=http%3A%2F%2Flocalhost%2Fdhis-integration%2Fbundle.js%3Fnull");
    Assert.assertFalse(response);
  }

  @Test
  @SneakyThrows
  public void shouldRedirectForBahmniLoginIfReportingSessionIdIsInvalidatedByOpenMRS() {
    String COOKIE_VALUE = "SOME_REPORTING_SESSION_ID";
    Cookie cookie = new Cookie(REPORTING_COOKIE_NAME, COOKIE_VALUE);
    Cookie[] cookies = new Cookie[1];
    cookies[0] = cookie;

    when(httpServletRequestMock.getCookies()).thenReturn(cookies);
    when(authenticator.authenticate(COOKIE_VALUE)).thenReturn(NOT_AUTHENTICATED);
    when(httpServletResponseMock.getWriter()).thenReturn(printWriter);

    when(appProperties.getBahmniLoginUrl()).thenReturn("/bahmni/home/#/login?showLoginMessage");

    when(httpServletRequestMock.getRequestURL()).thenReturn(new StringBuffer("http://localhost/dhis-integration/bundle.js"));
    when(httpServletRequestMock.getQueryString()).thenReturn(null);

    boolean response = authenticationInterceptor.preHandle(httpServletRequestMock, httpServletResponseMock, new Object());

    verify(authenticator, times(1)).authenticate(COOKIE_VALUE);
    Assert.assertFalse(response);

  }

  @Test
  @SneakyThrows
  public void shouldNotCallOpenMRSIfHandlerIsNull() {
    boolean response = authenticationInterceptor.preHandle(httpServletRequestMock, httpServletResponseMock, null);

    Assert.assertFalse(response);

  }
}