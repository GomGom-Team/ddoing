package backend.animation.repository;

import backend.animation.domain.AnimationBestScoreEntity;
import backend.animation.domain.AnimationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnimationBestScoreRepository extends JpaRepository<AnimationBestScoreEntity, Long> {
    @Query("select a.bestScore from AnimationBestScoreEntity a where a.animationId = :animationId and a.userId = :userId")
    Long findBestScoreByAnimationIdAndUserId(Long animationId, String userId);

    AnimationBestScoreEntity findByAnimationIdAndUserId(Long animationId, String userId);

    @Query("select ani from AnimationEntity ani \n" +
            "where ani.id in \n" +
            "(select a.animationId from AnimationBestScoreEntity a where a.userId = :userId) \n" +
            "order by ani.title")
    List<AnimationEntity> findAllByUserIdDone(String userId);

    @Query("select ani from AnimationEntity ani where ani.id not in \n" +
            "(select a.animationId from AnimationBestScoreEntity a where a.userId = :userId)")
    List<AnimationEntity> findAllByUserIdLeft(String userId);

    @Query("select a.animationId from AnimationBestScoreEntity a group by a.animationId order by count(a.animationId) desc")
    List<Long> findTop6ByAnimationId();
}
