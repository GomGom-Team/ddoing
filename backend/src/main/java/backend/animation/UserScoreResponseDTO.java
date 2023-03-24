package backend.animation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserScoreResponseDTO {
    private String userId;
    private Long animationId;
    private Long bestScore;
    private Long exp;
    private Long level;
}
