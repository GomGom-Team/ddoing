package backend.draw.domain;

import backend.common.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="words")
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class WordEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "word", length = 15)
    private String word;

    @Column(name = "mean", length = 15)
    private String mean;

    @Column(name = "picture_path")
    private String picturePath;

    @OneToMany(mappedBy = "wordEntity", cascade = CascadeType.REMOVE)
    private List<SentenceEntity> sentenceEntities;

    @OneToMany(mappedBy = "wordEntity", cascade = CascadeType.REMOVE)
    private List<UserDrawingEntity> userDrawingEntities;
}