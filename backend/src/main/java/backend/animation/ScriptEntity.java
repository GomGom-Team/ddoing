package backend.animation;

import backend.common.BaseEntity;
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
public class ScriptEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = AnimationEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "animation_id")
    private Long animationId;

    @Column(name = "role", nullable = false, length = 15)
    private String role;

    @Column(name = "last_script")
    private boolean last_script;

    @Column(name = "start_time", nullable = false)
    private Long startTime;

    @Column(name = "end_time", nullable = false)
    private Long endTime;

    @Column(name = "end_sentence", nullable = false)
    private String engSentence;

    @Column(name = "ko_sentence", nullable = false)
    private String koSentence;


}
