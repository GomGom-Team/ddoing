package backend.animation;

import backend.user.UserEntity;
import backend.user.UserRepository;
import com.google.gson.Gson;
import com.sun.istack.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.sound.sampled.*;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.*;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AnimationServiceImpl implements AnimationService {

    private final AnimationRepository animationRepository;
    private final AnimationBestScoreRepository animationBestScoreRepository;
    private final AnimationScoreRepository animationScoreRepository;
    private final ScriptRepository scriptRepository;
    private final UserRepository userRepository;

    @Override
    public List<AnimationResponseDTO> getAnimations(String userId) {

        List<AnimationEntity> animations = animationRepository.findAll();
        List<AnimationResponseDTO> results = new ArrayList<>();

        for (AnimationEntity animation : animations) {
            // animationId, title, runningTime, pathUrl, bestScore, roles
            AnimationResponseDTO result = AnimationResponseDTO.builder()
                    .id(animation.getId())
                    .title(animation.getTitle())
                    .runningTime(animation.getRunningTime())
                    .pathUrl(animation.getPathUrl())
                    .bestScore(getBestScore(animation.getId(), userId))
                    .roles(getRoles(animation.getId()))
                    .build();

            results.add(result);
        }
        return results;
    }

    @Override
    public AnimationResponseDTO getAnimation(Long animationId, String userId) {
        AnimationEntity animation = animationRepository.findById(animationId).orElseThrow();
        AnimationResponseDTO result = AnimationResponseDTO.builder()
                .id(animationId)
                .title(animation.getTitle())
                .runningTime(animation.getRunningTime())
                .pathUrl(animation.getPathUrl())
                .bestScore(getBestScore(animationId, userId))
                .roles(getRoles(animationId))
                .build();
        return result;
    }

    @Override
    public Long getBestScore(Long animationId, String userId) {
        return animationBestScoreRepository.findBestScoreByAnimationIdAndUserId(animationId, userId);
    }

    @Override
    public Set<String> getRoles(Long animationId) {
        return new HashSet<>(scriptRepository.findRoleByAnimationId(animationId));
    }

    @Override
    public List<ScriptDTO> getScripts(Long animationId) {
        List<ScriptEntity> scripts = scriptRepository.findAllByAnimationId(animationId);
        List<ScriptDTO> results = new ArrayList<>();
        for (ScriptEntity script : scripts) {
            results.add(script.toScriptDTO());
        }
        return results;
    }

    // 점수 넣기
    @Override
    public boolean createScore(AnimationRequestDTO animationRequestDTO) {

        AnimationScoreEntity animationScoreEntity = AnimationScoreEntity.builder()
                .userId(animationRequestDTO.getUserId())
                .animationId(animationRequestDTO.getAnimationId())
                .score(animationRequestDTO.getScore())
                .animationEntity(animationRepository.findById(animationRequestDTO.getAnimationId()).orElseThrow())
                .userEntity(userRepository.findById(animationRequestDTO.getUserId()).orElseThrow())
                .build();

        animationScoreRepository.save(animationScoreEntity);
        return true;
    }

    // bestScore 생성
    @Override
    public boolean createBestScore(AnimationRequestDTO animationRequestDTO) {
        AnimationBestScoreEntity result = AnimationBestScoreEntity.builder()
                .animationId(animationRequestDTO.getAnimationId())
                .userId(animationRequestDTO.getUserId())
                .bestScore(animationRequestDTO.getScore())
                .animationEntity(animationRepository.findById(animationRequestDTO.getAnimationId()).orElseThrow())
                .userEntity(userRepository.findById(animationRequestDTO.getUserId()).orElseThrow())
                .build();
        animationBestScoreRepository.save(result);
        return true;
    }

    // bestScore 비교 갱신
    @Override
    public boolean updateBestScore(AnimationRequestDTO animationRequestDTO) {

        Long animationId = animationRequestDTO.getAnimationId();
        String userId = animationRequestDTO.getUserId();

        Long bestScore = getBestScore(animationId, userId);
        Long newScore = animationRequestDTO.getScore();

        AnimationBestScoreEntity animationBestScoreEntity = animationBestScoreRepository.findByAnimationIdAndUserId(animationId, userId);
        if (animationBestScoreEntity != null) {
            AnimationBestScoreEntity result = AnimationBestScoreEntity.builder()
                    .id(animationBestScoreEntity.getId())
                    .animationId(animationId)
                    .userId(userId)
                    .bestScore(bestScore < newScore ? newScore : bestScore)
                    .animationEntity(animationRepository.findById(animationRequestDTO.getAnimationId()).orElseThrow())
                    .userEntity(userRepository.findById(animationRequestDTO.getUserId()).orElseThrow())
                    .build();

            animationBestScoreRepository.save(result);
        } else {
            createBestScore(animationRequestDTO);
        }
        return true;
    }

    @Override
    public boolean updateUserExpAndLevel(AnimationRequestDTO animationRequestDTO) {
        UserEntity userEntity = userRepository.findById(animationRequestDTO.getUserId()).orElseThrow();

        Long newExp = userEntity.getExp() + animationRequestDTO.getScore();
        Long Level = userEntity.getLevel();

        if (newExp >= 300) {
            newExp -= 300;
            Level += 1;
        }

        UserEntity result = UserEntity.builder()
                .id(userEntity.getId())
                .name(userEntity.getName())
                .email(userEntity.getEmail())
                .nickName(userEntity.getNickName())
                .exp(newExp)
                .level(Level)
                .build();

        userRepository.save(result);    // update
        return true;
    }

    // 갱신 점수 반환
    // userId, animationId, bestScore, exp, level
    @Override
    public UserScoreResponseDTO getUserScores(AnimationRequestDTO animationRequestDTO) {
        updateBestScore(animationRequestDTO);
        updateUserExpAndLevel(animationRequestDTO);

        UserEntity userEntity = userRepository.findById(animationRequestDTO.getUserId()).orElseThrow();
        UserScoreResponseDTO animationResponseDTO = UserScoreResponseDTO.builder()
                .userId(animationRequestDTO.getUserId())
                .animationId(animationRequestDTO.getAnimationId())
                .bestScore(getBestScore(animationRequestDTO.getAnimationId(), animationRequestDTO.getUserId()))
                .exp(userEntity.getExp())
                .level(userEntity.getLevel())
                .build();

        return animationResponseDTO;
    }

    // 영상 제목별 검색 리스트
    @Override
    public List<AnimationResponseDTO> searchAnimations(String keyword, String userId) {
        List<AnimationEntity> animations = animationRepository.findByTitleContainingIgnoreCase(keyword);
        List<AnimationResponseDTO> results = new ArrayList<>();

        for (AnimationEntity animation : animations) {
            // animationId, title, runningTime, pathUrl, bestScore, roles
            AnimationResponseDTO result = AnimationResponseDTO.builder()
                    .id(animation.getId())
                    .title(animation.getTitle())
                    .runningTime(animation.getRunningTime())
                    .pathUrl(animation.getPathUrl())
                    .bestScore(getBestScore(animation.getId(), userId))
                    .roles(getRoles(animation.getId()))
                    .build();

            results.add(result);
        }
        return results;
    }

    // 영상 필터링 (점수별)
    @Override
    public List<AnimationResponseDTO> filterAnimationsByScores(String userId, int score) {
        List<AnimationEntity> animationBestScoreEntities = animationBestScoreRepository.findAllByUserIdDone(userId);
        List<AnimationResponseDTO> results = new ArrayList<>();

        for (AnimationEntity bestScoreEntity : animationBestScoreEntities) {
            Long bestScore = getBestScore(bestScoreEntity.getId(), userId);

            AnimationResponseDTO result = AnimationResponseDTO.builder()
                    .id(bestScoreEntity.getId())
                    .title(animationRepository.findById(bestScoreEntity.getId()).orElseThrow().getTitle())
                    .runningTime(animationRepository.findById(bestScoreEntity.getId()).orElseThrow().getRunningTime())
                    .pathUrl(animationRepository.findById(bestScoreEntity.getId()).orElseThrow().getPathUrl())
                    .bestScore(bestScore)
                    .roles(getRoles(bestScoreEntity.getId()))
                    .build();

            if (score == 1 && bestScore > 0 && bestScore <= 30 || score == 2 && bestScore > 30 && bestScore <= 70 || score == 3 && bestScore > 70 && bestScore <= 100) {
                results.add(result);
            }
        }
        return results;
    }

    @Override
    public List<AnimationResponseDTO> filterAnimationsAlreadyDone(String userId, int done) {

        List<AnimationEntity> animationEntities;

        // 수강유무
        if (done == 1) {  // 수강 완료
            animationEntities = animationBestScoreRepository.findAllByUserIdDone(userId);
        } else {  // 수강 미완료
            animationEntities = animationBestScoreRepository.findAllByUserIdLeft(userId);
        }

        List<AnimationResponseDTO> results = new ArrayList<>();

        for (AnimationEntity animation : animationEntities) {
            AnimationResponseDTO result = AnimationResponseDTO.builder()
                    .id(animation.getId())
                    .title(animationRepository.findById(animation.getId()).orElseThrow().getTitle())
                    .runningTime(animationRepository.findById(animation.getId()).orElseThrow().getRunningTime())
                    .pathUrl(animationRepository.findById(animation.getId()).orElseThrow().getPathUrl())
                    .bestScore(getBestScore(animation.getId(), userId))
                    .roles(getRoles(animation.getId()))
                    .build();

            results.add(result);
        }
        return results;
    }

    @Override
    public int evaluateScript(String inputScript, MultipartFile multipartFile) {
        String openApiURL = "http://aiopen.etri.re.kr:8000/WiseASR/Pronunciation"; // 영어
        String accessKey = "d4508197-2611-4b53-9c32-298bcf39c9f7";    // 발급받은 API Key
        String languageCode = "english";     // 언어 코드
        String script = inputScript;    // 평가 대본
        String audioContents = null;

        WavToRaw wavToRaw = new WavToRaw();

        Gson gson = new Gson();

        Map<String, Object> request = new HashMap<>();
        Map<String, String> argument = new HashMap<>();

        try {
            byte[] changefile = wavToRaw.SaveRaw(multipartFile.getBytes());
            audioContents = Base64.getEncoder().encodeToString(changefile);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        argument.put("language_code", languageCode);
        argument.put("script", script);
        argument.put("audio", audioContents);

        request.put("argument", argument);

        URL url;
        Integer responseCode = null;
        String responBody = null;
        int score = 0;
        try {
            url = new URL(openApiURL);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setDoOutput(true);
            con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            con.setRequestProperty("Authorization", accessKey);

            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.write(gson.toJson(request).getBytes("UTF-8"));
            wr.flush();
            wr.close();

            responseCode = con.getResponseCode();
            InputStream is = con.getInputStream();
            byte[] buffer = new byte[is.available()];
            int byteRead = is.read(buffer);
            responBody = new String(buffer);


            // json 파싱
            JSONParser parser = new JSONParser();
            JSONObject jsonObject = (JSONObject) parser.parse(responBody);
            String return_object = jsonObject.get("return_object").toString();
            System.out.println("return_object-------: " + return_object);

            JSONObject jsonObject1 = (JSONObject) parser.parse(return_object);

            score = (int) (Float.parseFloat(jsonObject1.get("score").toString()) * 20);

        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        // score에 string 값이 들어갈 때 발생하는 에러 처리
        catch (NumberFormatException e) {
            score = 0;
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        return score;
    }

    public static class WavToRaw {

        private FileInputStream fstream = null;
        private byte[] audioBytes = new byte[1024];
        private byte[] buff = new byte[1024];
        private int read;

        public WavToRaw() {
            super();
            // TODO Auto-generated constructor stub
        }

        // 리니어 PCM 인코딩 및 지정된 파라미터를 가지는 AudioFormat를 구축합니다.
        // http://cris.joongbu.ac.kr/course/java/api/javax/sound/sampled/AudioFormat.html
        private static final AudioFormat FORMAT = new AudioFormat(
                16_000, // 16 kHz, sampleRate
                16, // 16 bits, sampleSizeInBits
                1, // Mono, int channels
                true, // Signed
                false // Little endian, True is BigEndian
        );

        //바이트 배열을 Raw 파일로 저장
        //Save byte array as Raw file
        public byte[] SaveRaw(byte[] file) throws UnsupportedAudioFileException {
            try {
                //핵심 코드
                //core code
                // System.out.println("Success");
                return (formatWavToRaw(changeFormat(file, FORMAT)));

            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            return null;
        }

        //Wav 파일에서 헤더 제거
        //Strip the header from the WAV file
        public byte[] formatWavToRaw(@NotNull final byte[] audioFileContent) {
            return Arrays.copyOfRange(audioFileContent, 44, audioFileContent.length);
        }

        //기존의 Wav 파일(바이트 배열) 을 다른 형식의 Wav 형식 (바이트 배열) 로 변환
        //WAV to WAV (different audio format)
        public byte[] changeFormat(@NotNull final byte[] audioFileContent, @NotNull final AudioFormat audioFormat)
                throws IOException, UnsupportedAudioFileException {
            try (final AudioInputStream originalAudioStream = AudioSystem
                    .getAudioInputStream(new ByteArrayInputStream(audioFileContent));
                 final AudioInputStream formattedAudioStream = AudioSystem.getAudioInputStream(audioFormat,
                         originalAudioStream);
                 final AudioInputStream lengthAddedAudioStream = new AudioInputStream(formattedAudioStream, audioFormat,
                         audioFileContent.length);
                 final ByteArrayOutputStream convertedOutputStream = new ByteArrayOutputStream()) {
                AudioSystem.write(lengthAddedAudioStream, AudioFileFormat.Type.WAVE, convertedOutputStream);
                return convertedOutputStream.toByteArray();
            }
        }

    }

    @Override
    public List<AnimationResponseDTO> getAnimationsTop6List(String userId) {
        List<Long> top6List = animationBestScoreRepository.findTop6ByAnimationId(userId);
        List<AnimationResponseDTO> results = new ArrayList<>();

        for (Long list : top6List) {
            AnimationEntity animation = animationRepository.findById(list).orElseThrow();
            AnimationResponseDTO result = AnimationResponseDTO.builder()
                    .id(animation.getId())
                    .title(animation.getTitle())
                    .runningTime(animation.getRunningTime())
                    .pathUrl(animation.getPathUrl())
                    .bestScore(getBestScore(animation.getId(), userId))
                    .roles(getRoles(animation.getId()))
                    .build();

            results.add(result);

        }
        return results;
    }
}