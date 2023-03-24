package backend.animation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class AnimationRequestDTO {
    private Long animationId;
    private String userId;
    private Long score;
    private Long exp;
    private Long level;
}
