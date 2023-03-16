package backend.draw;

import backend.BaseEntity;
import backend.user.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserDrawingEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = UserEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @ManyToOne(targetEntity = WordEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "word_id")
    private WordEntity wordEntity;

    @Column(name = "drawing_path")
    private String drawingPath;

    @Column(name = "percentage")
    private Float percentage;

}
