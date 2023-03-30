package backend.draw;

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
@Table(name="drawing_scores")
@NoArgsConstructor
@AllArgsConstructor
public class DrawingScoreEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = UserEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @Column(name = "user_id", insertable = false, updatable = false, nullable = false, length = 10)
    private String userId;


    @Column(name = "score")
    private Long score;
}
