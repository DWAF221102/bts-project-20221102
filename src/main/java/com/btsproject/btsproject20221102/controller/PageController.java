package com.btsproject.btsproject20221102.controller;


import com.btsproject.btsproject20221102.domain.User;
import com.btsproject.btsproject20221102.repository.account.AccountRepository;
import com.btsproject.btsproject20221102.service.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.Nullable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RequiredArgsConstructor
@Controller
public class PageController {



    // 메인페이지
    @GetMapping({"/", "/index"})
    public String index() {
        return "index";
    }

    @GetMapping("/newindex")
    public String newIndex() {
        return "newIndex";
    }

    // 통합 검색페이지
    @GetMapping("/totalsearch/{keyword}")
    public String totalSearch(@PathVariable String keyword) {
        return "totalSearch";
    }


    // 회원관련 페이지

    // 로그인 페이지
    @GetMapping("/login")
    public String login(@RequestParam(value = "error", required = false) String error,
                        @RequestParam(value = "exception", required = false) String exception,
                        Model model) {
        model.addAttribute("error", error);
        model.addAttribute("exception", exception);
        return "account/login";
    }
    // 회원가입 페이지
    @GetMapping("/signup")
    public String signup() {
        return "account/signup";
    }

    // 아이디 찾기 페이지
    @GetMapping("/forgot")
    public String forgot() {
        return "account/findAccount";
    }


    // 내 프로필 페이지
    @GetMapping("/myprofile")
    public String myprofile(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        if(principalDetails == null){
            return "account/login";
        }
        return "account/myProfile"; }

    // 비밀번호 변경 페이지
    @GetMapping("/myprofile/password")
    public String settings() {
        return "account/profileChangePassword";
    }

    //최근활동 페이지
    @GetMapping("/myactivity/{id}")
    public String myactivity(@PathVariable int id) {
        return "account/detailsOfActivity";
    }
    @GetMapping("/myactivity/article/{id}")
    public String myactivityArticle(@PathVariable int id) {
        return "account/detailsOfActivityArticle";
    }
    @GetMapping("/myactivity/qna/{id}")
    public String myactivityQna(@PathVariable int id) {
        return "account/detailsOfActivityQna";
    }
    @GetMapping("/myactivity/scrap/{id}")
    public String myactivityScrap(@PathVariable int id) {
        return "account/detailsOfActivityScrap";
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

    // article
    @GetMapping("/article/{id}")
    public String article(@PathVariable int id) { return "board/article"; }

    // update
    @GetMapping("/knowledge/update/{id}")
    public String knowledgeUpdate(@PathVariable int id) { return "board/knowledgeupdate"; }
    @GetMapping("/community/update/{id}")
    public String communityUpdate(@PathVariable int id) { return "board/communityUpdate"; }
    @GetMapping("/notice/update/{id}")
    public String noticeUpdate(@PathVariable int id) { return "board/noticeUpdate"; }


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
