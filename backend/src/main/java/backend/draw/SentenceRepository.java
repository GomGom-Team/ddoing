package backend.draw;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SentenceRepository extends JpaRepository<SentenceEntity, Long> {
    @Query(value="select * from sentences where word_id =:wordId order by rand() limit 1", nativeQuery = true)
    SentenceEntity findSentenceByWordId(@Param("wordId")long wordId);

}
