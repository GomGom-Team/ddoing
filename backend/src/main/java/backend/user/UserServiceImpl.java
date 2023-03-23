package backend.user;


import backend.auth.*;
import backend.common.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;

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
    public UserEntity createUser(UserDTO signUpDTO) {

        UserEntity userEntity = UserEntity.builder()
                .id(signUpDTO.getId())
                .name(signUpDTO.getName())
                .password(passwordEncoder.encode("{noop}"+signUpDTO.getPassword()))
                .email(signUpDTO.getEmail())
                .nickName(signUpDTO.getNickName())
                .build();

        return userRepository.save(userEntity);
    }

    @Override
    public UserEntity readUser(String id) {
        return userRepository.findById(id).orElseThrow();
    }

    @Override
    public boolean updateUser(UserDTO userDTO, String id) {
        UserEntity user = userRepository.findById(id).orElseThrow();
        UserEntity newUser = UserEntity.builder()
                .id(id)
                .nickName(userDTO.getNickName()==null?user.getNickName():userDTO.getNickName())
                .email(user.getEmail())
                .password(userDTO.getPassword()==null? "{noop}"+user.getPassword():passwordEncoder.encode("{noop}"+userDTO.getPassword()))
                .name(user.getName())
                .build();
        UserEntity result = userRepository.save(newUser);
        if(result==null) return false;
        return true;
    }

    @Override
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    @Override
    public TokenDTO loginUser(LoginDTO loginDTO) {
        UserEntity findUser = userRepository.findById(loginDTO.getId()).orElseThrow(() -> new CustomException(HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다."));
        log.info("id"+findUser.getId());
        log.info("userpw"+findUser.getPassword());
        log.info("dtopw"+loginDTO.getPassword());
        if(passwordEncoder.matches(passwordEncoder.encode(loginDTO.getPassword()), findUser.getPassword())){
            throw new CustomException(HttpStatus.BAD_REQUEST, "잘못된 비밀번호입니다.");
        }

        String accessToken = JwtTokenProvider.makeAccessToken(findUser.toUserDTO());
        String refreshToken = JwtTokenProvider.makeRefreshToken(findUser.getId());

        TokenEntity tokenEntity = TokenEntity.builder()
                .userEntity(findUser)
                .refreshToken(refreshToken)
                .build();
        tokenRepository.save(tokenEntity);

        return TokenDTO.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .build();
    }

    @Override
    public TokenEntity saveToken(String refreshToken, String userId) {
        TokenEntity findToken = tokenRepository.findByUserId(userId);
//        if(findToken!=null) tokenRepository.deleteById(findToken.getId());
        TokenEntity token = TokenEntity.builder()
                .id(findToken.getId())
                .refreshToken(refreshToken)
                .userEntity(userRepository.findById(userId).orElseThrow())
                .build();
        return tokenRepository.save(token);
    }

    @Override
    public String getToken(String userId) {
        TokenEntity tokenEntity = tokenRepository.findByUserId(userId);
        return tokenEntity.getRefreshToken();
    }

    @Override
    public void deleteToken(String userId) {
        tokenRepository.deleteByUserId(userId);
    }


}
