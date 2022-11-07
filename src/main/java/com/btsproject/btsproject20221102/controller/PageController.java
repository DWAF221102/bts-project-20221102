package com.btsproject.btsproject20221102.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/test")
    public String test() {
        return "test";
    }

    @GetMapping({"/", "/index"})
    public  String index() {
        return "index";
    }
}
