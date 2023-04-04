package backend.user;

import backend.auth.TokenEntity;
import backend.common.BaseEntity;
import backend.animation.domain.AnimationBestScoreEntity;
import backend.animation.domain.AnimationScoreEntity;
import backend.draw.domain.DrawingScoreEntity;
import backend.draw.domain.UserDrawingEntity;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="users")
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity extends BaseEntity {

    @Id
    @Column(length = 10)
    private String id;

    @Column(name = "name", nullable = false, length = 10)
    private String name;

    @Column(name = "nick_name", unique = true, length = 15)
    private String nickName;

    @Column(name = "pw")
    private String password;

    @Column(nullable = false, unique = true, length = 40)
    private String email;

    @Column(name = "exp")
    @ColumnDefault("0")
    private Long exp;

    @Column(name = "level")
    @ColumnDefault("1")
    private Long level;

    @Column(name = "profile", length = 20)
    private String profile;

    @OneToOne(mappedBy = "userEntity", cascade = CascadeType.REMOVE)
    private TokenEntity tokenEntity;

    @OneToMany(mappedBy = "userEntity", cascade = CascadeType.REMOVE)
    private List<DrawingScoreEntity> drawingScoreEntities;

    @OneToMany(mappedBy = "userEntity", cascade = CascadeType.REMOVE)
    private List<UserDrawingEntity> userDrawingEntities;

    @OneToMany(mappedBy = "userEntity", cascade = CascadeType.REMOVE)
    private List<AnimationScoreEntity> animationScoreEntities;

    @OneToMany(mappedBy = "userEntity", cascade = CascadeType.REMOVE)
    private List<AnimationBestScoreEntity> animationBestScoreEntities;

    public UserDTO toUserDTO(){
        UserDTO user = UserDTO.builder()
                .id(this.id)
                .email(this.email)
                .name(this.name)
                .nickName(this.nickName)
                .level(this.level)
                .exp(this.exp)
                .build();
        return user;
    }
}