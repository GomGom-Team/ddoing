package backend.draw;

import backend.common.BaseEntity;
import backend.user.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "user_drawing")
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserDrawingEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false, insertable = false, updatable = false)
    private String userId;
    @Column(name = "word_id", nullable = false, insertable = false, updatable = false)
    private Long wordId;

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

    UserDrawingDTO toUserDrawingDto() {
        UserDrawingDTO userDrawing = UserDrawingDTO.builder()
                .id(this.getId())
                .userId(this.getUserId())
                .wordId(this.getWordId())
                .drawingPath(this.getDrawingPath())
                .percentage(this.getPercentage())
                .build();

        return userDrawing;
    }

}
