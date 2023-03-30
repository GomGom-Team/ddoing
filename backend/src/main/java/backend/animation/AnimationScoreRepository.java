package backend.animation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnimationScoreRepository extends JpaRepository<AnimationScoreEntity, Long> {
    @Query("select a.id from AnimationEntity as a left join AnimationScoreEntity as b \n" +
            "on a.id = b.animationId \n" +
            "where b.userId = :userId \n" +
            "group by a.id\n" +
            "order by MAX(b.createdDate) desc")
    public List<Long> findTop4ByUserId(String userId);
}
