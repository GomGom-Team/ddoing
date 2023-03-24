package backend.auth;

import backend.common.Message;
import backend.common.MessageWithToken;
import backend.user.UserDTO;
import backend.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity loginUser(@RequestBody LoginDTO loginDTO){
        if(!userService.isExistById(loginDTO.getId())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Message("존재하지 않는 사용자 입니다"));
        }
        TokenDTO tokenDTO = userService.loginUser(loginDTO);
        return ResponseEntity.ok(new MessageWithToken("로그인 성공", tokenDTO));
    }

    @PostMapping("/refresh")
    public ResponseEntity refresh(@RequestBody Map<String, String> tokenMap){
//        엑세스 토큰 validate확인 아니면 재발급
        String id = JwtTokenProvider.getIdByAccessTokenToString(tokenMap.get("accessToken"));
        if(id!=null) {
            String refreshTokenBefore = userService.getToken(id);
            if (!JwtTokenProvider.validateToken(refreshTokenBefore)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Message("refreshToken이 만료되었습니다."));
            }
        }
        String refreshToken = JwtTokenProvider.makeRefreshToken(id);

        UserDTO user = userService.readUser(id).toUserDTO();
        String accessToken = JwtTokenProvider.makeAccessToken(user);

        TokenEntity result = userService.saveToken(refreshToken, id);

        if(result==null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Message("토큰을 재발급할 수 없습니다."));
        }

        TokenDTO token = TokenDTO.builder()
                .accessToken(accessToken)
                .grantType("Bearer")
                .build();
        return ResponseEntity.ok(new MessageWithToken("토큰 재발급 완료", token));
    }

    @DeleteMapping("/logout")
    public ResponseEntity logoutUser(HttpServletRequest request){
        String id = JwtTokenProvider.getIdByAccessToken(request);

        userService.deleteToken(id);
        return ResponseEntity.ok(new Message("로그아웃 성공"));
    }

}
