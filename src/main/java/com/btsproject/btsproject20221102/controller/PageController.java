package com.btsproject.btsproject20221102.controller;

import com.btsproject.btsproject20221102.aop.annotation.ValidAspect;
import lombok.RequiredArgsConstructor;
import com.btsproject.btsproject20221102.repository.qna.QnaRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.Valid;

@RequiredArgsConstructor
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
    public String login(@RequestParam(value = "error", required = false) String error,
                        @RequestParam(value = "exception", required = false) String exception,
                        Model model) {
        model.addAttribute("error", error);
        model.addAttribute("exception", exception);
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

    @GetMapping("/myprofile")
    public String myprofile() {

        return "account/myProfile";
    }

    @GetMapping("/myprofile/password")
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

    @GetMapping("/question/article/{id}")
    public String questionArticle(@PathVariable int id) {

        return "qna/qnaBoardArticle";
    }


    // 나머지 카테고리(지식, 커뮤니티, 공지)
    @GetMapping("/knowledge")
    public String knowledge() {
        return "board/knowledgeBoard";
    }

    @GetMapping("/knowledge/write")
    public String knowledgeWrite() {
        return "board/knowledgeWrite";
    }

    @GetMapping("/community")
    public String community() {
        return "board/communityBoard";
    }

    @GetMapping("/community/write")
    public String write() {
        return "board/communityWrite";
    }

    @GetMapping("/notice")
    public String notice() {
        return "board/noticeBoard";
    }

    @GetMapping("/notice/write")
    public String noticeWrite() {
        return "board/noticeWrite";
    }

    // article 은 나중에 pathvariable을 통해 들어가도록 만들어야함
    @GetMapping("/article")
    public String article() { return "board/article"; }


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


}
