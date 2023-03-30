package backend.animation;

import backend.user.UserEntity;
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

    @Query("select ani from AnimationEntity as ani where ani.id not in \n" +
            "(select a.animationId from AnimationBestScoreEntity as a where a.userId = :userId)")
    List<AnimationEntity> findAllByUserIdLeft(String userId);

    // db추가 후 limit 6 추가
    @Query("select a.animationId from AnimationBestScoreEntity a group by a.animationId order by count(a.animationId) desc")
    List<Long> findTop6ByAnimationId(String userId);
}
