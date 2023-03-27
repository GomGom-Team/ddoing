package backend.draw;

import backend.common.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequestMapping("/drawing")
@RestController
@RequiredArgsConstructor
public class DrawingController {
    private final DrawingServiceImpl drawingService;

    @PostMapping("/file/upload")
    public ResponseEntity drawingUpload(@RequestPart MultipartFile multipartFile, @RequestPart("dto") UserDrawingDTO userDrawingDTO) throws IOException {
        drawingService.saveFile(multipartFile, userDrawingDTO);
        return ResponseEntity.ok(new Message("이미지 업로드 성공"));
    }
}
