package backend.draw.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "sentences")
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SentenceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = WordEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "word_id")
    private WordEntity wordEntity;

    @Column(name = "eng_sentence")
    private String engSentence;

    @Column(name = "ko_sentence")
    private String koSentence;
}
