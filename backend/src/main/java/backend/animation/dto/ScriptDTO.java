package backend.animation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class ScriptDTO {
    private Long id;
    private Long animationId;
    private String role;
    private Long lastScript;
    private Long startTime;
    private Long endTime;
    private String engSentence;
    private String koSentence;
}
