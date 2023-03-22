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
@Table(name="animation_best_scores")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AnimationBestScoreEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false, insertable = false, updatable = false, length = 10)
    private String userId;

    @Column(name = "animation_id", nullable = false, insertable = false, updatable = false)
    private Long animationId;

    @Column(name = "best_score")
    private Long bestScore;

    @ManyToOne(targetEntity = UserEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @ManyToOne(targetEntity = AnimationEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "animation_id")
    private AnimationEntity animationEntity;


}
