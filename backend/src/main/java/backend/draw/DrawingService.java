package backend.draw;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface DrawingService {
    void saveFile(MultipartFile multipartFile, UserDrawingDTO userDrawingDTO) throws IOException;
}
