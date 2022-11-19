package com.btsproject.btsproject20221102.service.account;


import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService{

    private final JavaMailSender sender; // Bean 등록해둔 MailConfig를 불러옴

    @Override
    public Map<String, Object> sendEmail(String toAddress, String subject, String body) {
        Map<String, Object> result = new HashMap<String, Object>();
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        try {
            helper.setTo(toAddress);
            helper.setSubject(subject);
            helper.setText(body);
            result.put("resultCode", 200);
        } catch (MessagingException e) {
            e.printStackTrace();
            result.put("resultCode", 500);
        }

        sender.send(message);

        return result;
    }


//    // 랜덤 코드
//    private String randomKey = UUID.randomUUID().toString().replace("-", "");  // 인증번호
//
//    // 메일 내용 작성
//    @Override
//    public MimeMessage createMessage(String to) throws MessagingException, UnsupportedEncodingException {
//
//        MimeMessage message = javaMailSender.createMimeMessage();
//
//        message.addRecipients(Message.RecipientType.TO, to); // 보내는 대상
//        message.setSubject("BTS 회원가입 이메일 인증"); // 제목
//
//        String mainmsg = "";
//        mainmsg += "<div>인증번호다</div>";
//        mainmsg += "<div>" + randomKey;
//        mainmsg += "</div>";
//        // 내용, charset 타입, subtype
//        message.setText(mainmsg, "utf-8", "html");
//        // 보내는 사람의 이메일 주소, 보내는 사람 이름
//        message.setFrom(new InternetAddress("hobbyseo@naver.com", "DWAF_Admin"));
//        return message;
//    }
//
//    // 메일을 발송
//    // sendSimpleMessage의 매개변수로 들어온 to는 이메일 주소가 되고,
//    // MimeMessage 객체 안에 내가 전송할 메일의 내용을 담는다.
//    // 그리고 bean으로 등록해둔 javamail 객체를 사용해서 이메일 send
//    @Override
//    public String sendSimpleMessage(String to) throws Exception {
//
////         TODO Auto-generated method stub
//        MimeMessage message = createMessage(to);
//        try {
//            javaMailSender.send(message);
//        } catch (MailException e) {
//            e.printStackTrace();
//            throw new IllegalStateException();
//        }
//
//        return randomKey;
//    }
}
