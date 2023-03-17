package backend.user;


public interface UserService {

    boolean isExistById(String id);

    boolean isExistByNickName(String nickName);

    boolean isExistByEmail(String email);

    UserEntity createUser(SignUpDTO signUpDTO);


}
