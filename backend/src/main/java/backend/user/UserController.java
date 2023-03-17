package backend.user;

import backend.common.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/users")
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity insertUser(@RequestBody SignUpDTO signUpDTO){
        UserEntity result = userService.createUser(signUpDTO);
        if(result==null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Message("회원가입에 실패하였습니다."));
        }
        return ResponseEntity.ok(new Message("회원가입 성공"));
    }

    @GetMapping("/id/{id}")
    public ResponseEntity checkDuplicatedId(@PathVariable String id){
        if(userService.isExistById(id)){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Message("이미 존재하는 아이디입니다."));
        }
        return ResponseEntity.ok(new Message("사용 가능한 아이디 입니다."));
    }

    @GetMapping("/nickName/{nickName}")
    public ResponseEntity checkDuplicatedNickName(@PathVariable String nickName){
        if(userService.isExistByNickName(nickName)){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Message("이미 존재하는 닉네임입니다."));
        }
        return ResponseEntity.ok(new Message("사용 가능한 닉네임 입니다."));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity checkDuplicatedEmail(@PathVariable String email){
        if(userService.isExistByEmail(email)){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Message("이미 존재하는 이메일입니다."));
        }
        return ResponseEntity.ok(new Message("사용 가능한 이메일 입니다."));
    }

}
