package todoapp;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class SimpleBackend extends HttpServlet {

    private byte[] data = "[]".getBytes();
    private String contentType = "application/json";

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType(contentType);
        resp.setStatus(HttpServletResponse.SC_OK);
        resp.setContentLength(data.length);
        resp.getOutputStream().write(data);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        contentType = req.getContentType();
        data = read(req.getInputStream());
        resp.setStatus(HttpServletResponse.SC_OK);
        resp.setContentLength(0);
    }

    private static byte[] read(InputStream in) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        byte[] buf = new byte[4096];
        int read;
        do {
            read = in.read(buf);
            if (read!=-1) {
                out.write(buf, 0, read);
            }
        } while (read!=-1);
        return out.toByteArray();
    }

}
