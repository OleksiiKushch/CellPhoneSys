package cells.controller;

import cells.model.Subscriber;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpSession;
import java.util.Base64;

@Controller
public class SubscriberController {

    private static final String USER_TOKEN = "userToken";
    private static final String LOGGED_USER = "loggedUser";

    @GetMapping("/register-new-subscriber")
    public String showRegisterNewSubscriberPage() {
        return "register-new-subscriber";
    }

    @GetMapping("/login")
    public String showLoginPage() {
        return "login";
    }

    @GetMapping("/profile")
    public String showProfilePage() {
        return "profile";
    }

    @GetMapping("/sms-profile")
    public String showSmsProfilePage() {
        return "sms-profile";
    }

    @GetMapping("/getUserToken")
    public ResponseEntity getUserToken(HttpSession session) {
        return ResponseEntity.ok().body(session.getAttribute(USER_TOKEN));
    }

    @PostMapping("/logout")
    public ResponseEntity logout(HttpSession session) {
        session.removeAttribute(LOGGED_USER);
        session.removeAttribute(USER_TOKEN);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/generateUserToken")
    public ResponseEntity generateUserToken(@RequestBody String request) throws JsonProcessingException {
        Subscriber subscriber = new ObjectMapper().readValue(request, Subscriber.class);
        return ResponseEntity.ok().body(generateUserToken(subscriber));
    }

    @PostMapping("/updateDataInSession")
    public ResponseEntity updateDataInSession(@RequestBody String request, HttpSession session) throws JsonProcessingException {
        Subscriber subscriber = new ObjectMapper().readValue(request, Subscriber.class);
        session.setAttribute(LOGGED_USER, subscriber);
        return ResponseEntity.ok().build();
    }

    @PostMapping ("/authorize")
    public ResponseEntity authorizeUser(@RequestBody String request, HttpSession session) throws JsonProcessingException {
        Subscriber subscriber = new ObjectMapper().readValue(request, Subscriber.class);
        String encodedToken = generateUserToken(subscriber);
        session.setAttribute(LOGGED_USER, subscriber);
        session.setAttribute(USER_TOKEN, encodedToken);
        return ResponseEntity.ok().build();
    }

    private String generateUserToken(Subscriber subscriber) {
        String token = subscriber.getPhoneNumber() + ":" + subscriber.getPassword();
        return Base64.getEncoder().encodeToString(token.getBytes());
    }
}
