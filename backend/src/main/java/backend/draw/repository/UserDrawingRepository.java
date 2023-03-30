package backend.draw.repository;

import backend.draw.domain.UserDrawingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserDrawingRepository extends JpaRepository<UserDrawingEntity, Long> {
    @Query("select d from UserDrawingEntity d where d.userId= :userId and d.wordId = :wordId")
    UserDrawingEntity findByUserIdAndWordId(String userId, Long wordId);

    @Query(value = "select * from user_drawing order by percentage desc", nativeQuery = true)
    List<UserDrawingEntity> findByPercentage();
}
