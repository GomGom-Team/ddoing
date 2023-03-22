package backend.animation;

import backend.user.UserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AnimationServiceImpl implements AnimationService {

    private final AnimationRepository animationRepository;
    private final AnimationBestScoreRepository animationBestScoreRepository;
    private final ScriptRepository scriptRepository;

    @Override
    public List<AnimationResponseDTO> getAnimations(String userId) {

        List<AnimationEntity> animations = animationRepository.findAll();
        List<AnimationResponseDTO> results = new ArrayList<>();

        for (AnimationEntity animation : animations) {

            // animationId, title, runningTime, pathUrl, bestScore, roles
            AnimationResponseDTO result = AnimationResponseDTO.builder()
                    .id(animation.getId())
                    .title(animation.getTitle())
                    .runningTime(animation.getRunningTime())
                    .pathUrl(animation.getPathUrl())
                    .bestScore(getBestScore(animation.getId(), userId))
                    .roles(getRoles(animation.getId()))
                    .build();

            results.add(result);
        }
        return results;
    }

    @Override
    public Long getBestScore(Long animationId, String userId) {
        return animationBestScoreRepository.findBestScoreByAnimationIdAndUserId(animationId, userId);
    }

    @Override
    public Set<String> getRoles(Long animationId) {
        return new HashSet<>(scriptRepository.findRoleByAnimationId(animationId));
    }
}
