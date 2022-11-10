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

    // 통합 검색페이지
    @GetMapping("totalsearch")
    public String totalSearch() {
        return "totalSearch";
    }


    // 회원관련 페이지
    @GetMapping("/login")
    public String login() {
        return "account/login";
    }

    @GetMapping("/signup")
    public String signup() {
        return "account/signup";
    }

    @GetMapping("/forgot")
    public String forgot() {
        return "account/findAccount";
    }

    @GetMapping("/forgot/password-change")
    public String passwordChange() {
        return "account/changePassword";
    }

    @GetMapping("/myprofile")
    public String myprofile() {
        return "account/myProfile";
    }

    @GetMapping("/myprofile/password-change")
    public String settings() {
        return "account/profileChangePassword";
    }

    @GetMapping("/myactivity")
    public String myactivity() {
        return "account/detailsOfActivity";
    }


    // QNA
    @GetMapping("/question")
    public String question() {
        return "qna/qnaBoard";
    }

    @GetMapping("/question/write")
    public String questionWrite() {
        return "qna/qnaCreate";
    }


    // 나머지 카테고리(지식, 커뮤니티, 공지)
    @GetMapping("/knowledge")
    public String knowledge() {
        return "board/knowledgeBoard";
    }

    @GetMapping("/community")
    public String community() {
        return "board/communityBoard";
    }

    @GetMapping("/notice")
    public String notice() {
        return "board/noticeBoard";
    }

    @GetMapping("/board/write")
    public String write() {
        return "board/write";
    }


    // article 은 나중에 pathvariable을 통해 들어가도록 만들어야함
    @GetMapping("/article")
    public String article() { return "board/article"; }

    @GetMapping("/qnaarticle")
    public String qnaArticle() {
        return "qna/qnaBoard";
    }


    // admin 페이지

    @GetMapping("/admin")
    public String adminMain() {
        return "admin/adminMain";
    }
    @GetMapping("/admin/userlist")
    public String userlist() {
        return "admin/adminUserlist";
    }

    @GetMapping("/admin/questionlist")
    public String questionlist() {
        return "admin/adminQnAList";
    }

    @GetMapping("/admin/boardlist")
    public String boardlist() {
        return "admin/adminBoardList";
    }


    //////////////////////////////////////////////////////////////////
    @GetMapping("/admin/knowledge/write")
    public String knowledgeWrite() {
        return "admin/knowledgeWrite";
    }

    @GetMapping("/admin/notice/write")
    public String noticeWrite() {
        return "admin/noticeWrite";
    }
}
