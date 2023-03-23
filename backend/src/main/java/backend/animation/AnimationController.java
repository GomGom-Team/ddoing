package backend.animation;

import backend.user.UserDTO;
import backend.user.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/animations")
@RestController
@RequiredArgsConstructor
public class AnimationController {

    private final AnimationServiceImpl animationService;

    // 영상 전체 리스트
    @GetMapping
    public ResponseEntity selectAllAnimations(@RequestBody UserDTO userDto){
        if(animationService.getAnimations(userDto.getId()).size() < 1){
                return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.ok(animationService.getAnimations(userDto.getId()));
        }
    }
    
    // 영상 상세
    @GetMapping("/{id}")
    public ResponseEntity selectOneAnimation(@PathVariable Long id, @RequestBody UserDTO userDTO){
        return ResponseEntity.ok(animationService.getAnimation(id, userDTO.getId()));
    }
    
    // 스크립트 정보 불러오기
    @GetMapping("/script/{id}")
    public ResponseEntity getScripts(@PathVariable Long id){
        return ResponseEntity.ok(animationService.getScripts(id));
    }

    // 점수 갱신
    // userId, animationId, score, exp, level (AnimationRequestDTO)
//    @PostMapping("/{animationId}/{userId}")
//    public ResponseEntity updateAnimationScore(@RequestBody AnimationRequestDTO animationRequestDTO){
//
//    }

}
