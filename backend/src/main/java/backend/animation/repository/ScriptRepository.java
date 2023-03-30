package backend.animation.repository;

import backend.animation.domain.ScriptEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ScriptRepository extends JpaRepository<ScriptEntity, Long> {

    List<ScriptEntity> findAllByAnimationId(Long animationId);

    @Query("select s.role from ScriptEntity s where s.animationId = :animationId")
    List<String> findRoleByAnimationId(Long animationId);
}
