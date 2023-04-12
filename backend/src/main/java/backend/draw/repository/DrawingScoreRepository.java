package backend.draw.repository;

import backend.draw.domain.DrawingScoreEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrawingScoreRepository extends JpaRepository<DrawingScoreEntity, Long> {
}
