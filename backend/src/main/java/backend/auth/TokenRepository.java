package backend.auth;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository <TokenEntity, Long> {

    TokenEntity findByUserId(String userId);

    void deleteByUserId(String userId);

    boolean existsByUserId(String userId);
}
