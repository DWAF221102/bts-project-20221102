package com.btsproject.btsproject20221102.service.account;


import com.btsproject.btsproject20221102.domain.Key;
import com.btsproject.btsproject20221102.domain.User;
import com.btsproject.btsproject20221102.dto.account.PwSearchReqDto;
import com.btsproject.btsproject20221102.dto.email.SendMailDto;
import com.btsproject.btsproject20221102.repository.account.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService{

    private final AccountRepository accountRepository;

    private final JavaMailSender sender;

    @Override
    public void sendSignupAuthenticationEmail(SendMailDto sendMailDto) throws Exception {
        sendMailDto.setSubject("[BTS] 회원가입 인증메일입니다.");
        sendMailDto.setContent(createCertifiedContent(sendMailDto.getEmail()));
        sendEmail(sendMailDto);
    }

    @Override
    public void sendAccountPasswordEmail(SendMailDto sendMailDto) throws Exception {
        sendMailDto.setSubject("[BTS] 비밀번호 찾기메일입니다.");
        sendMailDto.setContent(passwordSearchContent(sendMailDto.getEmail()));
        sendEmail(sendMailDto);
    }

    @Override
    public void sendEmail(SendMailDto sendMailDto) throws MessagingException {
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        try {
            helper.setTo(sendMailDto.getEmail());
            helper.setSubject(sendMailDto.getSubject());
            helper.setText(sendMailDto.getContent(), true);
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        sender.send(message);
    }

    private String createCertifiedContent(String email) {
        User user = accountRepository.findUserByEmail(email);
        String token = UUID.randomUUID().toString().replaceAll("-", "");

        Key key = Key.builder()
                .user_id(user.getId())
                .enabled_key(token)
                .build();

        accountRepository.saveKey(key);

        String content = "<div>\n" +
                "        <header style=\"width: 100%; height: 80px; background-color: aqua; font-size: 30px; display: flex; align-items: center;\">\n" +
                "            <h3 style=\"margin-left: 10px;\">BTS홈페이지 인증메일입니다.</h3>\n" +
                "        </header>\n" +
                "        <main>\n" +
                "            <div style=\"font-size: 16px; margin-top: 30px;\">\n" +
                "                <p>회원가입을 축하드립니다.</p>\n" +
                "                <p>메일 인증을 위하여 밑에 버튼을 클릭해서 홈페이지로 돌아가 다시 로그인해주세요.</p>\n" +
                "            </div>\n" +
                "            <div>\n" +
                "                <a href=\"http://localhost:8000/authentication/certified?id=" + user.getId() + "&accessKey=" + token + "\"><button style=\"width: 200px; height:60px; margin-top: 30px; cursor: pointer; font-size: 16px; font-weight: 500; background-color: #dbdbdb; border: none;\">인증완료</button></a>\n" +
                "            </div>\n" +
                "        </main>\n" +
                "    </div>";

        return content;
    }

    private String passwordSearchContent(String email) {
        User user = accountRepository.findUserByEmail(email);

        PwSearchReqDto pwSearchReqDto = PwSearchReqDto.builder()
                .id(user.getId())
                .build();

        String token = UUID.randomUUID().toString().replaceAll("-", "");

        Key key = Key.builder()
                .user_id(user.getId())
                .enabled_key(token)
                .build();

        accountRepository.saveKey(key);

        String content = "<div>\n" +
                "        <header style=\"width: 100%; height: 80px; background-color: aqua; font-size: 30px; display: flex; align-items: center;\">\n" +
                "            <h3 style=\"margin-left: 10px;\">BTS홈페이지 인증메일입니다.</h3>\n" +
                "        </header>\n" +
                "        <main>\n" +
                "            <div style=\"font-size: 16px; margin-top: 30px;\">\n" +
                "                <p>비밀번호 찾기 메일입니다.</p>\n" +
                "                <p>버튼을 클릭하여 비밀번호 변경 페이지로 들어가주세요.</p>\n" +
                "            </div>\n" +
                "            <div>\n" +
                "                <a href=\"http://localhost:8000/authentication/password/modification?id=" + user.getId() + "&accessKey=" + token + "\"><button style=\"width: 200px; height:60px; margin-top: 30px; cursor: pointer; font-size: 16px; font-weight: 500; background-color: #dbdbdb; border: none;\">비밀번호 변경</button></a>\n" +
                "            </div>\n" +
                "        </main>\n" +
                "    </div>";

        return content;
    }


}
