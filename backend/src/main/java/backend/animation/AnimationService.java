package backend.animation;


import java.util.Collection;
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
}
