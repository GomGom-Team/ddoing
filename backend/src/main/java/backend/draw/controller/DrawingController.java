package backend.draw.controller;

import backend.common.Message;
import backend.draw.dto.DrawingScoreRequestDTO;
import backend.draw.service.DrawingServiceImpl;
import backend.draw.dto.UserDrawingDTO;
import backend.draw.dto.UserDrawingResponseDTO;
import backend.user.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequestMapping("/drawing")
@RestController
@RequiredArgsConstructor
public class DrawingController {
    private final DrawingServiceImpl drawingService;
    private final UserServiceImpl userService;

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

    // 명예의 전당
    @GetMapping("/gallery")
    public ResponseEntity getUserDrawingGallery(){
        List<UserDrawingResponseDTO> result = drawingService.selectDrawingGallery();
        if(result.size() <= 0) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new Message("그림 점수가 존재하지 않음"));
        }
        return ResponseEntity.ok(result);
    }

    // 마이페이지 - 내가 그린 그림
    @GetMapping("/myRecent/{id}")
    public ResponseEntity getMyRecentDrawing(@PathVariable String id){

        if(!userService.isExistById(id)){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Message("존재하지 않는 사용자 입니다."));
        }

        List<UserDrawingResponseDTO> result = drawingService.selectUserRecentDrawing(id);

        if(result.size() <= 0) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new Message("사용자가 그린 그림이 존재하지 않음"));
        }
        return ResponseEntity.ok(result);
    }
}
