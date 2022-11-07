package com.btsproject.btsproject20221102.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {


    // 메인페이지
    @GetMapping({"/", "/index"})
    public String index() {
        return "index";
    }


    // 회원관련 페이지
    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/signup")
    public String signup() {
        return "signup";
    }

    @GetMapping("/forgot")
    public String forgot() {
        return "forgot";
    }

    @GetMapping("/myprofile")
    public String myprofile() {
        return "myprofile";
    }

    @GetMapping("/myprofile/settings")
    public String settings() {
        return "settings";
    }

    @GetMapping("/myprofile/password-change")
    public String passwordChange() {
        return "password-change";
    }

    @GetMapping("/myactivity")
    public String myactivity() {
        return "myactivity";
    }


    // QNA
    @GetMapping("/question")
    public String question() {
        return "question";
    }

    @GetMapping("/question/write")
    public String questionWrite() {
        return "questionWrite";
    }

    // 나머지 카테고리(지식, 커뮤니티, 공지)
    @GetMapping("/knowledge")
    public String knowledge() {
        return "knowledge";
    }

    @GetMapping("/community")
    public String community() {
        return "community";
    }

    @GetMapping("/community/write")
    public String communitWrite() {
        return "communitWrite";
    }

    @GetMapping("/notice")
    public String notice() {
        return "notice";
    }


    // admin 페이지
    @GetMapping("/admin/userlist")
    public String userlist() {
        return "admin/userlist";
    }

    @GetMapping("/admin/questionlist")
    public String questionlist() {
        return "admin/questionlist";
    }

    @GetMapping("/admin/boardlist")
    public String boardlist() {
        return "admin/boardlist";
    }

    @GetMapping("/admin/knowledge/write")
    public String knowledgeWrite() {
        return "admin/knowledgeWrite";
    }

    @GetMapping("/admin/notice/write")
    public String noticeWrite() {
        return "admin/noticeWrite";
    }
}
