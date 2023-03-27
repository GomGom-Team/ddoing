package backend.draw;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserDrawingRepository extends JpaRepository<UserDrawingEntity, Long> {
    @Query("select d from UserDrawingEntity d where d.userId= :userId and d.wordId = :wordId")
    UserDrawingEntity findByUserIdAndWordId(String userId, Long wordId);
}
