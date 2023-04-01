package backend.animation.service;


import backend.animation.dto.AnimationRequestDTO;
import backend.animation.dto.AnimationResponseDTO;
import backend.animation.dto.ScriptDTO;
import backend.animation.dto.UserScoreResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

public interface AnimationService {

    List<AnimationResponseDTO> getAnimations(String userId);
    AnimationResponseDTO getAnimation(Long animationId, String userId);

    Long getBestScore(Long animationId, String userId);

    Set<String> getRoles(Long animationId);

    List<ScriptDTO> getScripts(Long animationId);

    // 점수 넣기
    boolean createScore(AnimationRequestDTO animationRequestDTO);

    boolean createBestScore(AnimationRequestDTO animationRequestDTO);

    // 해당 유저의 해당 애니메이션 BestScore 갱신
    boolean updateBestScore(AnimationRequestDTO animationRequestDTO);

    // 경험치, level 갱신
    boolean updateUserExpAndLevel(AnimationRequestDTO animationRequestDTO);

    // 갱신 점수 반환
    UserScoreResponseDTO getUserScores(AnimationRequestDTO animationRequestDTO);

    // 영상 검색
    List<AnimationResponseDTO> searchAnimations(String keyword, String userId);

    List<AnimationResponseDTO> filterAnimationsByScores(String userId, int score);

    List<AnimationResponseDTO> filterAnimationsAlreadyDone(String userId, int done);

    // 인기리스트
    List<AnimationResponseDTO> getAnimationsTop6List();

    // mypage - 최근 공부한 영상 조회
    List<AnimationResponseDTO> getAnimationsStudyRecent(String userId);

    int evaluateScript(String script, MultipartFile multipartFile);

}
