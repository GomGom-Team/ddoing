package backend.draw;

import backend.animation.AnimationRequestDTO;
import backend.animation.UserScoreResponseDTO;
import backend.user.UserEntity;
import backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class DrawingServiceImpl implements DrawingService {
    private final UserRepository userRepository;
    private final WordRepository wordRepository;
    private final SentenceRepository sentenceRepository;
    private final UserDrawingRepository userDrawingRepository;
    private final DrawingScoreRepository drawingScoreRepository;

    private final long LEVELUP_STANDARD = 200L;
    private final int ONE_DRAWING_SCORE = 5;

    @Value("${part.upload.path}")   // application.properties 에서 ec2 path 로 변경
    private String userDrawingPath;

    private String getFullPath(String imgPath, String fileName) {
        return imgPath + fileName;
    }

    @Override
    public void saveFile(MultipartFile drawingImg, UserDrawingDTO userDrawingDTO) throws IOException {
        // 변환
        String originalFileName = drawingImg.getOriginalFilename();  // 원본 파일 이름
        String storeFileName = createStoreFileName(originalFileName);   // 저장할 파일명으로 변경
        String storedPath = getFullPath(userDrawingPath, storeFileName);   // 저장 위치 + custom 된 파일명

        // db에 저장
        // userId, worId 같을때 (percentage 비교후 저장)
        UserDrawingEntity oldDrawing = userDrawingRepository.findByUserIdAndWordId(userDrawingDTO.getUserId(), userDrawingDTO.getWordId());
        UserDrawingEntity result = null;

        // 이미 그림이 있을 경우
        if (oldDrawing != null) {
            // percentage에 맞춰서 그림 자체 비교 해줘야 됨 (서버 저장소에서도 갱신)
            Float newPercentage = userDrawingDTO.getPercentage();

            // percentage 갱신 (서버 저장소에서도 삭제 후 갱신)
            if (oldDrawing.getPercentage() <= newPercentage) {
                result = UserDrawingEntity.builder()
                        .id(oldDrawing.getId())
                        .userEntity(userRepository.findById(userDrawingDTO.getUserId()).orElseThrow())
                        .wordEntity(wordRepository.findById(userDrawingDTO.getWordId()).orElseThrow())
                        .drawingPath(storeFileName)
                        .percentage(newPercentage)
                        .build();

                // 서버 저장소에서 삭제
                File old = new File(userDrawingPath + oldDrawing.getDrawingPath());
                old.delete();

            } else {  // percentage 미갱신
                return;
            }
        } else {  // 그림이 없는 경우
            result = UserDrawingEntity.builder()
                    .userEntity(userRepository.findById(userDrawingDTO.getUserId()).orElseThrow())
                    .wordEntity(wordRepository.findById(userDrawingDTO.getWordId()).orElseThrow())
                    .drawingPath(storeFileName)
                    .percentage(userDrawingDTO.getPercentage())
                    .build();
        }
        drawingImg.transferTo(new File(storedPath));
        userDrawingRepository.save(result);
    }

    // 서버에 저장할 파일명 생성
    private String createStoreFileName(String originalFileName) {
        String ext = extractExt(originalFileName);
        String uuid = UUID.randomUUID().toString();
        return uuid + "." + ext;
    }

    // 원본파일 확장자 반환
    private String extractExt(String originalFileName) {
        int pos = originalFileName.lastIndexOf(".");
        return originalFileName.substring(pos + 1);
    }

    // 단어 + 예문 리스트 조회
    @Override
    public List<DrawingResponseDTO> getDrawingWords(){

        List<WordEntity> words = wordRepository.findWordsByRand();
        List<DrawingResponseDTO> results = new ArrayList<>();

        // 단어 6개
        for(WordEntity word : words) {
            SentenceEntity sentence =  sentenceRepository.findSentenceByWordId(word.getId());
            // id, word, mean, eng_sentence, ko_sentence, word_id
            DrawingResponseDTO result = DrawingResponseDTO.builder()
                    .id(word.getId())
                    .word(word.getWord())
                    .mean(word.getMean())
                    .engSentence(sentence.getEngSentence())
                    .koSentence(sentence.getKoSentence())
                    .build();

            results.add(result);
        }
        return results;
    }

    // 그림 평가 점수 저장
    @Override
    public boolean createDrawingScore(DrawingScoreRequestDTO drawingScoreRequestDTO){

        DrawingScoreEntity drawingScoreEntity = DrawingScoreEntity.builder()
                .userEntity(userRepository.findById(drawingScoreRequestDTO.getUserId()).orElseThrow())
                .score(drawingScoreRequestDTO.getScore() * ONE_DRAWING_SCORE)
                .build();

        drawingScoreRepository.save(drawingScoreEntity);
        return true;
    }



    // 유저 경험치,레벨 업데이트
    @Override
    public boolean updateUserExpAndLevel(DrawingScoreRequestDTO drawingScoreRequestDTO) {
        UserEntity userEntity = userRepository.findById(drawingScoreRequestDTO.getUserId()).orElseThrow();

        Long newExp = userEntity.getExp() + drawingScoreRequestDTO.getScore() * ONE_DRAWING_SCORE;
        Long Level = userEntity.getLevel();

        if (newExp >= LEVELUP_STANDARD) {
            newExp -= LEVELUP_STANDARD;
            Level += 1;
        }

        UserEntity result = UserEntity.builder()
                .id(userEntity.getId())
                .name(userEntity.getName())
                .email(userEntity.getEmail())
                .nickName(userEntity.getNickName())
                .exp(newExp)
                .level(Level)
                .build();

        userRepository.save(result);    // update
        return true;
    }


    // 갱신 점수 반환
    // userId, animationId, bestScore, exp, level
    @Override
    public DrawingScoreResponseDTO getUserScores(DrawingScoreRequestDTO drawingScoreRequestDTO) {
        updateUserExpAndLevel(drawingScoreRequestDTO);

        UserEntity userEntity = userRepository.findById(drawingScoreRequestDTO.getUserId()).orElseThrow();
        DrawingScoreResponseDTO drawingScoreResponseDTO = DrawingScoreResponseDTO.builder()
                .userId(drawingScoreRequestDTO.getUserId()).exp(userEntity.getExp())
                .level(userEntity.getLevel())
                .build();

        return drawingScoreResponseDTO;
    }



}
