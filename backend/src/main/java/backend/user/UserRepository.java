package backend.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, String> {

    boolean existsByNickName(String nickName);

    boolean existsByEmail(String email);

}
