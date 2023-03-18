package com.btsproject.btsproject20221102.service.account;

import com.btsproject.btsproject20221102.domain.*;
import com.btsproject.btsproject20221102.dto.account.*;
import com.btsproject.btsproject20221102.dto.index.AsidePriceListRespDto;
import com.btsproject.btsproject20221102.exception.CustomValidationException;
import com.btsproject.btsproject20221102.repository.account.AccountRepository;
import com.btsproject.btsproject20221102.service.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Slf4j   // 나중에 지움
@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private final AccountRepository accountRepository;

    @Value("${file.path}")
    private String filePath;

//    private UserInfo userInfo;

    @Override
    public boolean checkUsername(String username) throws Exception {

        User user = accountRepository.findUserByEmail(username);
        if (user != null) {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("username", "이미 가입된 이메일입니다.");
            throw new CustomValidationException("CheckUsername Error", errorMap);
        }
        return true;
    }
    // 닉네임 변경 중복 검사
    @Override
    public boolean checkNickname(String nickname, @AuthenticationPrincipal PrincipalDetails principalDetails) throws Exception {
       User user = accountRepository.findUserByNickname(nickname);

        if(user.getNickname() == principalDetails.getUser().getNickname()){
            if (user != null) {
               Map<String, String> errorMap = new HashMap<String, String>();

                errorMap.put("nickname", "※ 중복된 닉네임입니다.");
                throw new CustomValidationException("CheckNickname Error", errorMap);
            }
            return true;
        }
        return true;
    }

    //  전화 번호 변경 중복 검사
    @Override
    public boolean checkPhone(String phone, @AuthenticationPrincipal PrincipalDetails principalDetails) throws Exception {
        User user = accountRepository.findUserByPhone(phone);

        if(user.getPhone() == principalDetails.getUser().getPhone()) {
            if (user != null) {
                Map<String, String> errorMap = new HashMap<String, String>();
                errorMap.put("phone", "※ 중복된 전화 번호입니다.");
                throw new CustomValidationException("CheckPhone Error", errorMap);
            }
            return true;
        }
        return true;
    }

    // 회원가입
    @Override
    public boolean signup(SignupReqDto signupReqDto) throws Exception {
        return accountRepository.save(signupReqDto.toUserEntity()) != 0;
    }

    // 유저 정보 불러오기
    @Override
    public UserInfo getUserInfo(int userId) throws Exception {
//        log.info("getUserInfo~~" + accountRepository.userInfo(userId));
        return accountRepository.userInfo(userId);
    }

    // 회원 정보 변경
    @Transactional
    @Override
    public void modifyProfile(PrincipalDetails principalDetails, ModifyReqDto modifyReqDto) throws Exception {

        User user = modifyReqDto.toModifyEntity(principalDetails);
        if (user.getNickname() == null && user.getPhone() == null && user.getSkill() == null) {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("error", "수정한 정보가 없습니다.");
            throw new CustomValidationException("수정사항 없음", errorMap);
        }
        accountRepository.modifyProfile(user);
        user.updatePrincipalDetails(principalDetails);
    }

    // 프로필 이미지 변경
    @Transactional
    @Override
    public void modifyProfileImage(PrincipalDetails principalDetails, MultipartFile file) throws Exception {
        String originName = file.getOriginalFilename();
        String extension = originName.substring(originName.lastIndexOf("."));
        String tempName = UUID.randomUUID().toString() + extension;
        System.out.println("이미지 파일이름: " + tempName);
        int userId = principalDetails.getUser().getId();

        Path uploadPath = Paths.get(filePath+ "/user/" + tempName);

        // 세션 변경
        principalDetails.getUser().setUser_img(tempName);

        // 파일 경로
        File f = new File(filePath + "/user");

        try{
            Files.write(uploadPath, file.getBytes());
        } catch (Exception e) {
            e.printStackTrace();
        }

        UserProfileImage userProfileImage = UserProfileImage.builder()
                .user_id(userId)
                .temp_name(tempName)
                .build();

        accountRepository.modifyProfileImage(userProfileImage);

    }

    // 비밀번호 변경
    @Override
    public void modifyPassword(PrincipalDetails principalDetails, PwChangeReqDto pwChangeReqDto) throws Exception {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        if (bCryptPasswordEncoder.matches(pwChangeReqDto.getCurrentPw(), principalDetails.getUser().getPassword())) {
            if (pwChangeReqDto.getNewPw().equals(pwChangeReqDto.getCheckNewPw())) {
                String changedPw = bCryptPasswordEncoder.encode(pwChangeReqDto.getNewPw());

                User userEntity = principalDetails.getUser();
                userEntity.setPassword(bCryptPasswordEncoder.encode(pwChangeReqDto.getNewPw()));
                accountRepository.modifyPassword(userEntity);
                principalDetails.getUser().setPassword(changedPw);
            } else {
                Map<String, String> errorMap = new HashMap<String, String>();
                errorMap.put("newPasswordCheckError", "새 비밀번호가 서로 일치하지 않습니다.");
                throw new CustomValidationException("newPasswordCheckError", errorMap);
            }
        } else {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("currentPw", "기존 비밀번호가 일치하지 않습니다.");
            throw new CustomValidationException("password isNonCmp", errorMap);
        }
    }

    @Override
    public boolean deleteUser(int id) throws Exception {
        User img = accountRepository.getImgFile(id);

        if(accountRepository.deleteUser(id) > 0) {
            Path uploadPath = Paths.get(filePath + "/user/" + img.getUser_img());

            File file = new File(uploadPath.toUri());
            if(file.exists()) {
                file.delete();
            }
            return true;
        }
        return false;
    }

    @Override
    public boolean checkAuthenticationToken(CertifiedDto certifiedDto) throws Exception {
        boolean result = false;

        Key key = accountRepository.getAuthenticationKey(certifiedDto.getId());
        if(key != null) {
            accountRepository.updateAuthenticationStatus(key.getId());

            if(key.getEnabled_key().equalsIgnoreCase(certifiedDto.getAccessKey())) {
                accountRepository.enabledUpdate(certifiedDto.getId());
                result = true;
            }
        }

        return result;
    }

    @Override
    public boolean checkAuthenticationTokenForgot(PwSearchReqDto pwSearchReqDto) throws Exception {
        boolean result = false;

        Key key = accountRepository.getAuthenticationKey(pwSearchReqDto.getId());
        if(key != null) {
            accountRepository.updateAuthenticationStatus(key.getId());

            if(key.getEnabled_key().equalsIgnoreCase(pwSearchReqDto.getAccessKey())) {
                result = true;
            }
        }

        return result;
    }

    @Override
    public void modifyForgotPassword(PwForgotReqDto pwForgotReqDto) throws Exception {

        Key key = accountRepository.getForgotAuthenticationKey(pwForgotReqDto.toKeyEntity());
        if(key == null) {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("error", "유효하지 않은 토큰값입니다.");
            throw new CustomValidationException("유효하지 않은 토큰값입니다.", errorMap);
        }

        if(!pwForgotReqDto.getNewPw().equals(pwForgotReqDto.getCheckNewPw())) {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("error", "비밀번호가 일치하지 않습니다.");
            throw new CustomValidationException("비밀번호가 일치하지 않습니다.", errorMap);
        }
        User user = User.builder().id(pwForgotReqDto.getId()).password(new BCryptPasswordEncoder().encode(pwForgotReqDto.getNewPw())).build();
        accountRepository.modifyPassword(user);
    }

    // 활동내역
    @Override
    public List<RecentBoardListRespDto> loadRecentBoardList(int userId) throws Exception {
        List<RecentBoardListRespDto> boardList = new ArrayList<RecentBoardListRespDto>();
        accountRepository.loadRecentBoardList(userId).forEach(board -> {
            boardList.add(board.toRecentBoardListRespDto());
        });

        return boardList;
    }


    @Override
    public List<MyprofileBoardRespDto> loadMyprofileBoardList(int userId) throws Exception {
        List<MyprofileBoardRespDto> list = new ArrayList<MyprofileBoardRespDto>();
        accountRepository.loadMyprofileBoard(userId).forEach(myboard -> {
            list.add(myboard.toMyprofileBoardRespDto());
        });
        return list;
    }

    @Override
    public List<MyprofileQnaRespDto> loadMyprofileQnaList(int userId) throws Exception {
        List<MyprofileQnaRespDto> list = new ArrayList<MyprofileQnaRespDto>();
        accountRepository.loadMyprofileQna(userId).forEach(myqna -> {
            list.add(myqna.toMyprofileQnaRespDto());
        });
        return list;
    }

    @Override
    public List<MyLikeBoardRespDto> loadMyLikeBoardList(int userId) throws Exception {
        List<MyLikeBoardRespDto> list = new ArrayList<MyLikeBoardRespDto>();
        accountRepository.loadMyLikeBoard(userId).forEach(likeboard -> {
            list.add(likeboard.toMyLikeBoardRespDto());
        });
        return list;
    }

    @Override
    public List<MyLikeQnaRespDto> loadMyLikeQnaList(int userId) throws Exception {
        List<MyLikeQnaRespDto> list = new ArrayList<MyLikeQnaRespDto>();
        accountRepository.loadMyLikeQna(userId).forEach(likeqna -> {
            list.add(likeqna.toMypLikeQnaRespDto());
        });
        return list;
    }






    // 포인트
    @Override
    public Point point(int userId) throws Exception {
        return accountRepository.point(userId);
    }


    // 포인트 충전
    @Override
    public void chargePoint(PointChargeDto pointChargeDto) throws Exception {
        accountRepository.pointCharge(pointChargeDto.toPointCharge());
        log.info("포인트 정보: " + pointChargeDto.toPointCharge());
    }
}
