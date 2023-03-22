package backend.animation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimationRepository extends JpaRepository<AnimationEntity, Long> {
    List<AnimationEntity> findAll();
}
