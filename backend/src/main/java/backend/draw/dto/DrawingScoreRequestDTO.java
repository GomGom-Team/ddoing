package backend.draw.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class DrawingScoreRequestDTO {
    private Long id;
    private String userId;
    private Long score;
}
