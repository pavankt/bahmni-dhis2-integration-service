package com.thoughtworks.bahmnidhis2integrationservice.controller;

import com.thoughtworks.bahmnidhis2integrationservice.util.PrivilegeUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/api")
public class HomeController {

	@GetMapping(value = "/session")
	@ResponseBody
	public List<String> sessionPrivileges() {
		return PrivilegeUtil.getAvailablePrivileges();
	}

}
