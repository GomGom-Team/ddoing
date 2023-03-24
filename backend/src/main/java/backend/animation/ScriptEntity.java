package backend.animation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@Table(name="scripts")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ScriptEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "animation_id", nullable = false, insertable = false, updatable = false)
    private Long animationId;

    @Column(name = "role", nullable = false, length = 15)
    private String role;

    @Column(name = "last_script")
    private Long lastScript;

    @Column(name = "start_time", nullable = false)
    private Long startTime;

    @Column(name = "end_time", nullable = false)
    private Long endTime;

    @Column(name = "eng_sentence", nullable = false, length = 1000)
    private String engSentence;

    @Column(name = "ko_sentence", nullable = false, length = 1000)
    private String koSentence;
    @ManyToOne(targetEntity = AnimationEntity.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "animation_id")
    private AnimationEntity animationEntity;
    public ScriptDTO toScriptDTO(){
        ScriptDTO script = ScriptDTO.builder()
                .id(this.getId())
                .animationId(this.getAnimationId())
                .role(this.getRole())
                .lastScript(this.getLastScript())
                .startTime(this.getStartTime())
                .endTime(this.getEndTime())
                .engSentence(this.getEngSentence())
                .koSentence(this.getKoSentence())
                .build();
        return script;
    }
}
