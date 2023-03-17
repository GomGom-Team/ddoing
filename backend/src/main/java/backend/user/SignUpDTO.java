package backend.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignUpDTO {

    private String id;

    private String name;

    private String nickName;

    private String password;

    private String email;
}
