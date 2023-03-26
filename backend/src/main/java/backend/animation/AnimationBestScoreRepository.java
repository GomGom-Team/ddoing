package backend.animation;

import backend.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnimationBestScoreRepository extends JpaRepository<AnimationBestScoreEntity, Long> {
    @Query("select a.bestScore from AnimationBestScoreEntity a where a.animationId = :animationId and a.userId = :userId")
    Long findBestScoreByAnimationIdAndUserId(Long animationId, String userId);

    AnimationBestScoreEntity findByAnimationIdAndUserId(Long animationId, String userId);

    List<AnimationBestScoreEntity> findAllByUserIdOrderByBestScoreDesc(String userId);
}
