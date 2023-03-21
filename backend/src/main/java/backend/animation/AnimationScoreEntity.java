package backend.animation;

import backend.common.BaseEntity;
import backend.user.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@Table(name="animation_scores")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AnimationScoreEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = AnimationEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "animation_id")
    private AnimationEntity animationEntity;

    @ManyToOne(targetEntity = UserEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @Column(name = "score")
    private Long score;
}
