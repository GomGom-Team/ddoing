package backend.animation;


import java.util.List;
import java.util.Set;

public interface AnimationService {

    List<AnimationResponseDTO> getAnimations(String userId);
    AnimationResponseDTO getAnimation(Long animationId, String userId);

    Long getBestScore(Long animationId, String userId);

    Set<String> getRoles(Long animationId);

    List<ScriptDTO> getScripts(Long animationId);
}
