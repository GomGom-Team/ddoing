package backend.draw;

import backend.common.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    // 단어 + 예문 조회
    @GetMapping("/words")
    public ResponseEntity selectDrawingWords() {
        return ResponseEntity.ok(drawingService.getDrawingWords());
    }

    // 그림 평가 점수 저장
    @PostMapping("/score")
    public ResponseEntity saveDrawingScore(@RequestBody DrawingScoreRequestDTO drawingScoreRequestDTO){
        // 점수 저장
        if(!drawingService.createDrawingScore(drawingScoreRequestDTO)){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Message("점수 저장 실패"));
        }

        // 경험치, 레벨 갱신
        drawingService.updateUserExpAndLevel(drawingScoreRequestDTO);

        // 갱신된 경험치, 레벨 리턴
        return ResponseEntity.ok(drawingService.getUserScores(drawingScoreRequestDTO));
    }
}
