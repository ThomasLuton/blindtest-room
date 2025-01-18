package com.tluton.blinddest_room_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.security.core.SpringSecurityCoreVersion;

@SpringBootApplication
public class BlindtestRoomApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlindtestRoomApiApplication.class, args);
	}

}

