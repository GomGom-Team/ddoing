package backend.draw.repository;

import backend.draw.domain.WordEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WordRepository extends JpaRepository<WordEntity, Long> {

    @Query(value = "select * from words order by rand() limit 6", nativeQuery = true)
    List<WordEntity> findWordsByRand();

}
