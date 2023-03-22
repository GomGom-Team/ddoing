package backend.animation;

import backend.user.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class AnimationBestScoreDTO {
    private Long id;
    private AnimationDTO animationDTO;
    private UserDTO userDTO;
    private Long score;
}
