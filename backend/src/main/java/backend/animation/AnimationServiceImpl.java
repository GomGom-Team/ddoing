package backend.animation;

import backend.user.UserEntity;
import backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AnimationServiceImpl implements AnimationService {

    private final AnimationRepository animationRepository;
    private final AnimationBestScoreRepository animationBestScoreRepository;
    private final AnimationScoreRepository animationScoreRepository;
    private final ScriptRepository scriptRepository;
    private final UserRepository userRepository;

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
    public AnimationResponseDTO getAnimation(Long animationId, String userId) {
        AnimationEntity animation = animationRepository.findById(animationId).orElseThrow();
        AnimationResponseDTO result = AnimationResponseDTO.builder()
                .id(animationId)
                .title(animation.getTitle())
                .runningTime(animation.getRunningTime())
                .pathUrl(animation.getPathUrl())
                .bestScore(getBestScore(animationId, userId))
                .roles(getRoles(animationId))
                .build();
        return result;
    }

    @Override
    public Long getBestScore(Long animationId, String userId) {
        return animationBestScoreRepository.findByAnimationIdAndUserId(animationId, userId).getBestScore();
    }

    @Override
    public Set<String> getRoles(Long animationId) {
        return new HashSet<>(scriptRepository.findRoleByAnimationId(animationId));
    }

    @Override
    public List<ScriptDTO> getScripts(Long animationId) {
        List<ScriptEntity> scripts = scriptRepository.findAllByAnimationId(animationId);
        List<ScriptDTO> results = new ArrayList<>();
        for (ScriptEntity script : scripts) {
            results.add(script.toScriptDTO());
        }
        return results;
    }

    // 점수 넣기
    @Override
    public boolean createScore(AnimationRequestDTO animationRequestDTO) {

        AnimationScoreEntity animationScoreEntity = AnimationScoreEntity.builder()
                .userId(animationRequestDTO.getUserId())
                .animationId(animationRequestDTO.getAnimationId())
                .score(animationRequestDTO.getScore())
                .animationEntity(animationRepository.findById(animationRequestDTO.getAnimationId()).orElseThrow())
                .userEntity(userRepository.findById(animationRequestDTO.getUserId()).orElseThrow())
                .build();

        animationScoreRepository.save(animationScoreEntity);
        return true;
    }

    // bestScore 생성
    @Override
    public boolean createBestScore(AnimationRequestDTO animationRequestDTO) {
        AnimationBestScoreEntity result = AnimationBestScoreEntity.builder()
                .animationId(animationRequestDTO.getAnimationId())
                .userId(animationRequestDTO.getUserId())
                .bestScore(animationRequestDTO.getScore())
                .animationEntity(animationRepository.findById(animationRequestDTO.getAnimationId()).orElseThrow())
                .userEntity(userRepository.findById(animationRequestDTO.getUserId()).orElseThrow())
                .build();
        animationBestScoreRepository.save(result);
        return true;
    }

    // bestScore 비교 갱신
    @Override
    public boolean updateBestScore(AnimationRequestDTO animationRequestDTO) {

        Long animationId = animationRequestDTO.getAnimationId();
        String userId = animationRequestDTO.getUserId();

        Long bestScore = getBestScore(animationId, userId);;
        Long newScore = animationRequestDTO.getScore();

        AnimationBestScoreEntity animationBestScoreEntity = animationBestScoreRepository.findByAnimationIdAndUserId(animationId, userId);
        if(animationBestScoreEntity != null){
            AnimationBestScoreEntity result = AnimationBestScoreEntity.builder()
                    .id(animationBestScoreEntity.getId())
                    .animationId(animationId)
                    .userId(userId)
                    .bestScore(bestScore < newScore ? newScore : bestScore)
                    .animationEntity(animationRepository.findById(animationRequestDTO.getAnimationId()).orElseThrow())
                    .userEntity(userRepository.findById(animationRequestDTO.getUserId()).orElseThrow())
                    .build();

            animationBestScoreRepository.save(result);
        }else{
            createBestScore(animationRequestDTO);
        }
        return true;
    }

    @Override
    public boolean updateUserExpAndLevel(AnimationRequestDTO animationRequestDTO) {
        UserEntity userEntity = userRepository.findById(animationRequestDTO.getUserId()).orElseThrow();

        Long newExp = userEntity.getExp() + animationRequestDTO.getScore();
        Long Level = userEntity.getLevel();

        if (newExp >= 300) {
            newExp -= 300;
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
    public UserScoreResponseDTO getUserScores(AnimationRequestDTO animationRequestDTO) {
        updateBestScore(animationRequestDTO);
        updateUserExpAndLevel(animationRequestDTO);

        UserEntity userEntity = userRepository.findById(animationRequestDTO.getUserId()).orElseThrow();
        UserScoreResponseDTO animationResponseDTO = UserScoreResponseDTO.builder()
                .userId(animationRequestDTO.getUserId())
                .animationId(animationRequestDTO.getAnimationId())
                .bestScore(getBestScore(animationRequestDTO.getAnimationId(), animationRequestDTO.getUserId()))
                .exp(userEntity.getExp())
                .level(userEntity.getLevel())
                .build();

        return animationResponseDTO;
    }
}
