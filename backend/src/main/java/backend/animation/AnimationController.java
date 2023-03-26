package backend.animation;

import backend.common.Message;
import backend.user.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RequestMapping("/animations")
@RestController
@RequiredArgsConstructor
public class AnimationController {

    private final AnimationServiceImpl animationService;

    // 영상 전체 리스트
    @GetMapping("/{userId}")
    public ResponseEntity selectAllAnimations(@PathVariable String userId){
        if(animationService.getAnimations(userId).size() < 1){
                return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.ok(animationService.getAnimations(userId));
        }
    }

    // 영상 상세
    @GetMapping("/{id}/{userId}")
    public ResponseEntity selectOneAnimation(@PathVariable Long id, @PathVariable String userId){
        return ResponseEntity.ok(animationService.getAnimation(id, userId));
    }
    
    // 스크립트 정보 불러오기
    @GetMapping("/script/{id}")
    public ResponseEntity getScripts(@PathVariable Long id){
        return ResponseEntity.ok(animationService.getScripts(id));
    }

    // 애니메이션 점수 갱신
    @PostMapping("/score")
    public ResponseEntity insertAnimationScore(@RequestBody AnimationRequestDTO animationRequestDTO){
        if(!animationService.createScore(animationRequestDTO)){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Message("점수 저장 실패"));
        }
        return ResponseEntity.ok(animationService.getUserScores(animationRequestDTO));
    }

    // 영상 검색 (제목별)
    @GetMapping("/search/{keyword}/{userId}")
    public ResponseEntity selectAllAnimations(@PathVariable String keyword, @PathVariable String userId) {
        if (animationService.searchAnimations(keyword, userId).size() < 1) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(animationService.searchAnimations(keyword, userId));
        }
    }

    // 영상 필터링
    @GetMapping("/filter/bestScore/{userId}")
    public ResponseEntity filterByBestScores(@PathVariable String userId){
        if (animationService.filterAnimationsByBestScore(userId).size() < 1) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(animationService.filterAnimationsByBestScore(userId));
        }
    }
}
