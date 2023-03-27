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

    @Query("select a from AnimationEntity  a left outer join AnimationBestScoreEntity b\n" +
            "on a.id = b.animationId where b.bestScore is null")
    List<AnimationEntity> findAllByUserIdLeft(String userId);
}
