package backend.draw.service;

import backend.draw.dto.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface DrawingService {
    // 그림 파일 저장
    void saveFile(MultipartFile multipartFile, UserDrawingDTO userDrawingDTO) throws IOException;
    // 단어+예문 조회
    List<DrawingResponseDTO> getDrawingWords();
    // 그림 점수 저장
    boolean createDrawingScore(DrawingScoreRequestDTO drawingScoreRequestDTO);
    // 그림 점수 추가로 인한 경험치 레벨 갱신
    boolean updateUserExpAndLevel(DrawingScoreRequestDTO drawingScoreRequestDTO);
    // 갱신 점수 반환
    DrawingScoreResponseDTO getUserScores(DrawingScoreRequestDTO drawingScoreRequestDTO);
    // 명예의 전당
    List<UserDrawingResponseDTO> selectUserDrawingGallery();
}
