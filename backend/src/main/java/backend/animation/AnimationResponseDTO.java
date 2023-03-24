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
public class AnimationResponseDTO {
    private Long id;    // animationId
    private String title;
    private Long runningTime;
    private String pathUrl;
    private Long bestScore;
    private Set<String> roles;
}
