package com.nimda.con.user.controller;

import com.nimda.con.user.entity.User;
import com.nimda.con.user.service.UserService;
import com.nimda.con.common.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UsersController {

    private static final Logger logger = LoggerFactory.getLogger(UsersController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * 모든 사용자 조회
     * 
     * @return 사용자 목록
     */
    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        System.out.println("=== getAllUsers() 메서드 호출됨 ===");
        try {
            System.out.println("=== UserService.findAll() 호출 중 ===");
            List<User> users = userService.findAll();
            System.out.println("=== 사용자 수: " + users.size() + " ===");

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("users", users);

            System.out.println("=== 응답 생성 완료 ===");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println("=== 오류 발생: " + e.getMessage() + " ===");
            e.printStackTrace();
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "사용자 목록 조회 중 오류가 발생했습니다: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    /**
     * user_id로 사용자 조회
     * 
     * @param userId 로그인 아이디
     * @return 사용자 정보
     */
    @GetMapping("/user-id/{userId}")
    public ResponseEntity<?> getUserByUserId(@PathVariable String userId) {
        try {
            Optional<User> userOpt = userService.findByUserId(userId);

            if (userOpt.isPresent()) {
                return ResponseEntity.ok(userOpt.get());
            } else {
                Map<String, String> error = new HashMap<>();
                error.put("message", "User not found");
                return ResponseEntity.status(404).body(error);
            }
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Failed to get user: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    /**
     * 사용자 정보 조회
     * 
     * @param id 사용자 ID
     * @return 사용자 정보
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {
            Optional<User> userOpt = userService.findById(id);

            if (userOpt.isPresent()) {
                return ResponseEntity.ok(userOpt.get());
            } else {
                Map<String, String> error = new HashMap<>();
                error.put("message", "User not found");
                return ResponseEntity.status(404).body(error);
            }
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Failed to get user: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    /**
     * 사용자명으로 사용자 조회
     * 
     * @param userName 사용자명
     * @return 사용자 정보
     */
    @GetMapping("/userName/{userName}")
    public ResponseEntity<?> getUserByUserName(@PathVariable String userName) {
        try {
            Optional<User> userOpt = userService.findByUserName(userName);

            if (userOpt.isPresent()) {
                return ResponseEntity.ok(userOpt.get());
            } else {
                Map<String, String> error = new HashMap<>();
                error.put("message", "User not found");
                return ResponseEntity.status(404).body(error);
            }
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Failed to get user: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    /**
     * 현재 로그인한 사용자 정보 조회
     * JWT 토큰에서 사용자 ID를 추출하여 사용자 정보를 반환합니다.
     * 
     * @param authHeader Authorization 헤더 (Bearer 토큰)
     * @return 현재 로그인한 사용자 정보
     */
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Authorization token is required");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

        String token = authHeader.substring(7);
        Long userId = jwtUtil.extractUserId(token);

        if (userId == null) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Invalid token");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

        Optional<User> userOpt = userService.findById(userId);
        if (userOpt.isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }

        User user = userOpt.get();
        User userWithoutPassword = new User();
        userWithoutPassword.setId(user.getId());
        userWithoutPassword.setUserId(user.getUserId());
        userWithoutPassword.setUserName(user.getUserName());
        userWithoutPassword.setEmail(user.getEmail());
        userWithoutPassword.setUniversityName(user.getUniversityName());
        userWithoutPassword.setDepartment(user.getDepartment());
        userWithoutPassword.setGrade(user.getGrade());

        return ResponseEntity.ok(userWithoutPassword);
    }
}
