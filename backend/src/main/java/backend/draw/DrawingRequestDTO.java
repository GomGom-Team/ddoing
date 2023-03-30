package backend.draw;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class DrawingRequestDTO {
    private Long id;

    private String word;

    private String mean;

    private String engSentence;

    private String koSentence;
}
