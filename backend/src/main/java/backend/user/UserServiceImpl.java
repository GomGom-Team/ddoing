package backend.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    public boolean isExistById(String id){
        return userRepository.existsById(id);
    }

    @Override
    public boolean isExistByNickName(String nickName) {
        return userRepository.existsByNickName(nickName);
    }

    @Override
    public boolean isExistByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public UserEntity createUser(SignUpDTO signUpDTO) {

        UserEntity userEntity = UserEntity.builder()
                .id(signUpDTO.getId())
                .name(signUpDTO.getName())
                .password(signUpDTO.getPassword())
                .email(signUpDTO.getEmail())
                .nickName(signUpDTO.getNickName())
                .build();

        return userRepository.save(userEntity);
    }
}
