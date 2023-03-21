package backend.auth;

import backend.common.BaseEntity;
import backend.user.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@Getter
@Table(name="token")
@NoArgsConstructor
@AllArgsConstructor
public class TokenEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", insertable = false, updatable = false, length = 10)
    private String userId;

    @Column(name="refresh_token", nullable = false)
    private String refreshToken;

    @OneToOne(targetEntity = UserEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;


}
