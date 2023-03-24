package backend.animation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnimationScoreRepository extends JpaRepository<AnimationScoreEntity, Long> {
}
