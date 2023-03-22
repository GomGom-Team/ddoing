package backend.animation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class AnimationDTO {
    private Long id;
    private String pathUrl;
    private String title;
    private Long runningTime;
    private List<AnimationBestScoreDTO> animationBestScores;
    private Set<AnimationScoreDTO> animationScores;
}
