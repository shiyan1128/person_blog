package com.shiyan.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
// @CrossOrigin 解决跨域问题  使得所有请求都能跨域访问，不安全
//@CrossOrigin
public class TestController {
    @GetMapping("test")
    public String test() {
        return "helo ssm-pro";
    }
}
