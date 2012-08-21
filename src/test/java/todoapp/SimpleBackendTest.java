package todoapp;

import org.junit.Before;
import org.junit.Test;
import org.mockito.stubbing.OngoingStubbing;
import org.springframework.mock.web.DelegatingServletInputStream;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import javax.servlet.ServletInputStream;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.ByteArrayInputStream;
import java.io.IOException;

import static org.mockito.Mockito.*;

public class SimpleBackendTest {

    private HttpServletResponse response;
    private SimpleBackend simpleBackend;
    private HttpServletRequest request;
    private ServletOutputStream outputStream;

    @Before
    public void setUp() throws Exception {
        request = mock(HttpServletRequest.class);
        response = mock(HttpServletResponse.class);
        outputStream = mock(ServletOutputStream.class);
        when(response.getOutputStream()).thenReturn(outputStream);
        simpleBackend = new SimpleBackend();
    }

    @Test
    public void get_returnsEmptyList() throws Exception {
        byte[] data = "[]".getBytes();

        simpleBackend.doGet(new MockHttpServletRequest(), response);

        verify(response).setContentType("application/json");
        verify(response).setStatus(HttpServletResponse.SC_OK);
        verify(response).setContentLength(data.length);
        verify(outputStream).write(data);
    }

    @Test
    public void post_returnsOkResponse() throws Exception{
        givenInputData(new byte[]{});

        simpleBackend.doPost(request, response);
        verify(response).setStatus(HttpServletResponse.SC_OK);
        verify(response).setContentLength(0);
    }

    @Test
    public void postAndGet_returnsPostedData() throws Exception {
        byte[] data = "data".getBytes();
        givenInputData(data);

        simpleBackend.doPost(request, new MockHttpServletResponse());
        simpleBackend.doGet(null, response);

        verify(response).setContentLength(data.length);
        verify(outputStream).write(data);
    }

    private OngoingStubbing<ServletInputStream> givenInputData(byte[] data) throws IOException {
        return when(request.getInputStream()).thenReturn(servletInputStreamWithData(data));
    }

    private DelegatingServletInputStream servletInputStreamWithData(byte[] data) {
        return new DelegatingServletInputStream(new ByteArrayInputStream(data));
    }

}
