package backend.draw.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class DrawingScoreResponseDTO {
    private String userId;
    private Long exp;
    private Long level;
}
