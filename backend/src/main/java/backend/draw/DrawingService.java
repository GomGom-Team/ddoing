package backend.draw;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface DrawingService {
    void saveFile(MultipartFile multipartFile, UserDrawingDTO userDrawingDTO) throws IOException;

    List<DrawingRequestDTO> getDrawingWords();
}
