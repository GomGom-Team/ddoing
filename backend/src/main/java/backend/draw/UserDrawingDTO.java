package backend.draw;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class UserDrawingDTO {
    private Long id;
    private String userId;
    private Long wordId;
    private String drawingPath;
    private Float percentage;

    @Override
    public String toString() {
        return "UserDrawingDTO{" +
                "id=" + id +
                ", userId='" + userId + '\'' +
                ", wordId=" + wordId +
                ", drawingPath='" + drawingPath + '\'' +
                ", percentage=" + percentage +
                '}';
    }
}
