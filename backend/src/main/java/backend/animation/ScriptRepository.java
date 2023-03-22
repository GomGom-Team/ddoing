package backend.animation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ScriptRepository extends JpaRepository<ScriptEntity, Long> {

    @Query("select s.role from ScriptEntity s where s.animationId = :animationId")
    List<String> findRoleByAnimationId(Long animationId);
}
