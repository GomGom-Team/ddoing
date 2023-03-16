package backend.draw;

import backend.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class WordEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "word")
    private String word;

    @Column(name = "mean")
    private String mean;

    @OneToMany(mappedBy = "wordEntity", cascade = CascadeType.REMOVE)
    private List<SentenceEntity> sentenceEntities;

    @OneToMany(mappedBy = "wordEntity", cascade = CascadeType.REMOVE)
    private List<UserDrawingEntity> userDrawingEntities;
}
