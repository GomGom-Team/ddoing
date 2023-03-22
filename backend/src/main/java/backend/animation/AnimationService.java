package backend.animation;


import backend.user.UserDTO;

import java.util.List;
import java.util.Set;

public interface AnimationService {

    List<AnimationResponseDTO> getAnimations(String userId);

    Long getBestScore(Long animationId, String userId);

    Set<String> getRoles(Long animationId);
}
