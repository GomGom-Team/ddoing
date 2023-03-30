package backend.draw.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class UserDrawingResponseDTO {
    private String userId;
    private String drawingPath;
    private Float percentage;
    private String word;
    private String mean;
}
