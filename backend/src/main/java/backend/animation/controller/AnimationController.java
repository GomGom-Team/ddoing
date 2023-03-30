package backend.animation.controller;

import backend.animation.dto.AnimationRequestDTO;
import backend.animation.service.AnimationServiceImpl;
import backend.common.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RequestMapping("/animations")
@RestController
@RequiredArgsConstructor
public class AnimationController {

    private final AnimationServiceImpl animationService;
    private String userId;

    // 영상 전체 리스트
    @GetMapping("/{userId}")
    public ResponseEntity selectAllAnimations(@PathVariable String userId) {
        if (animationService.getAnimations(userId).size() < 1) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(animationService.getAnimations(userId));
        }
    }

    // 영상 상세
    @GetMapping("/{id}/{userId}")
    public ResponseEntity selectOneAnimation(@PathVariable Long id, @PathVariable String userId) {
        return ResponseEntity.ok(animationService.getAnimation(id, userId));
    }

    // 스크립트 정보 불러오기
    @GetMapping("/script/{id}")
    public ResponseEntity getScripts(@PathVariable Long id) {
        return ResponseEntity.ok(animationService.getScripts(id));
    }

    // 애니메이션 점수 갱신
    @PostMapping("/score")
    public ResponseEntity insertAnimationScore(@RequestBody AnimationRequestDTO animationRequestDTO) {
        if (!animationService.createScore(animationRequestDTO)) {
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
    @GetMapping("/filter/star/{userId}/{star}")
    public ResponseEntity filterByScores1(@PathVariable String userId, @PathVariable int star) {
        if (animationService.filterAnimationsByScores(userId, star).size() < 1) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(animationService.filterAnimationsByScores(userId, star));
        }
    }

    // 영상 필터링 (수강유무)
    @GetMapping("/filter/{userId}/{done}")
    public ResponseEntity filterByAlreadyDone(@PathVariable String userId, @PathVariable int done) {
        if (animationService.filterAnimationsAlreadyDone(userId, done).size() < 1) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(animationService.filterAnimationsAlreadyDone(userId, done));
        }
    }

    // 발음 평가
    @PostMapping("/evaluate")
    public ResponseEntity PronunciationEvaluation(@RequestParam String script, @RequestPart MultipartFile multipartFile) {
        int result = animationService.evaluateScript(script, multipartFile);
        return ResponseEntity.ok(result);
    }

    // 영상 인기리스트
    @GetMapping("/top6/{userId}")
    public ResponseEntity getAnimationsTop6(@PathVariable String userId) {
        if (animationService.getAnimationsTop6List(userId).size() < 1) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(animationService.getAnimationsTop6List(userId));
        }
    }

    // 마이페이지 학습 영상 top4
    @GetMapping("/myStudy/{userId}")
    public ResponseEntity getAnimationsStudyRecent(@PathVariable String userId) {
        if (animationService.getAnimationsStudyRecent(userId).size() < 1) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(animationService.getAnimationsStudyRecent(userId));
        }
    }
}
