import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;

public class SimpleWebServer {

    public static void main(String[] args) throws Exception {
        // Create a basic HTTP server on port 8080
        HttpServer server = HttpServer.create(new java.net.InetSocketAddress(8080), 0);
        server.createContext("/", new HttpHandler() {
            @Override
            public void handle(HttpExchange exchange) throws IOException {
                // Determine the request URI and return the appropriate file
                String path = exchange.getRequestURI().getPath();
                if (path.equals("/")) {
                    path = "/index.html";  // Default to index.html if no specific file is requested
                }
                
                // Serve the static files from the current directory
                String filePath = "." + path;
                try {
                    byte[] response = Files.readAllBytes(Paths.get(filePath));
                    exchange.sendResponseHeaders(200, response.length);
                    OutputStream os = exchange.getResponseBody();
                    os.write(response);
                    os.close();
                } catch (IOException e) {
                    String errorResponse = "404 Not Found";
                    exchange.sendResponseHeaders(404, errorResponse.length());
                    OutputStream os = exchange.getResponseBody();
                    os.write(errorResponse.getBytes());
                    os.close();
                }
            }
        });

        // Start the server
        System.out.println("Server is running on http://localhost:8080");
        server.start();
    }
}
