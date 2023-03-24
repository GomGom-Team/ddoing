package backend.animation;

import backend.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AnimationBestScoreRepository extends JpaRepository<AnimationBestScoreEntity, Long> {
    AnimationBestScoreEntity findByAnimationIdAndUserId(Long animationId, String userId);
}
