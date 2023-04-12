package backend.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private String id;

    private String name;

    private String nickName;

    private String password;

    private String email;

    private Long level;

    private Long exp;

    private String profile;
}
