package backend.animation.controller;

import backend.animation.dto.AnimationRequestDTO;
import backend.animation.dto.AnimationResponseDTO;
import backend.animation.service.AnimationServiceImpl;
import backend.common.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RequestMapping("/animations")
@RestController
@RequiredArgsConstructor
public class AnimationController {

    private final AnimationServiceImpl animationService;

    // 영상 전체 리스트
    @GetMapping("/{userId}")
    public ResponseEntity selectAllAnimations(@PathVariable String userId) {
        List<AnimationResponseDTO> result = animationService.getAnimations(userId);
        if (result.size() < 1) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(result);
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
        return ResponseEntity.ok(new Message("점수 갱신 성공"));
    }

    // 영상 검색 (제목별)
    @GetMapping("/search/{keyword}/{userId}")
    public ResponseEntity selectAllAnimations(@PathVariable String keyword, @PathVariable String userId) {
        List<AnimationResponseDTO> result = animationService.searchAnimations(keyword, userId);
        if (result.size() < 1) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(result);
        }
    }

    // 영상 필터링
    @GetMapping("/filter/star/{userId}/{star}")
    public ResponseEntity filterByScores1(@PathVariable String userId, @PathVariable int star) {
        List<AnimationResponseDTO> result = animationService.filterAnimationsByScores(userId, star);
        if (result.size() < 1) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(result);
        }
    }

    // 영상 필터링 (수강유무)
    @GetMapping("/filter/{userId}/{done}")
    public ResponseEntity filterByAlreadyDone(@PathVariable String userId, @PathVariable int done) {
        List<AnimationResponseDTO> result = animationService.filterAnimationsAlreadyDone(userId, done);
        if (result.size() < 1) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(result);
        }
    }

    // 발음 평가
    @PostMapping("/evaluate")
    public ResponseEntity PronunciationEvaluation(@RequestParam String script, @RequestPart MultipartFile multipartFile) {
        int result = animationService.evaluateScript(script, multipartFile);
        return ResponseEntity.ok(result);
    }

    // 영상 인기리스트
    @GetMapping("/top6")
    public ResponseEntity getAnimationsTop6() {
        List<AnimationResponseDTO> result = animationService.getAnimationsTop6List();
        if (result.size() < 1) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(result);
        }
    }

    // 마이페이지 학습 영상 top4
    @GetMapping("/myStudy/{userId}")
    public ResponseEntity getAnimationsStudyRecent(@PathVariable String userId) {
        List<AnimationResponseDTO> result = animationService.getAnimationsStudyRecent(userId);
        if (result.size() < 1) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(result);
        }
    }
}
