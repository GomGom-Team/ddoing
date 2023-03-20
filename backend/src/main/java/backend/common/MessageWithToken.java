package backend.common;

import backend.auth.TokenDTO;
import lombok.Getter;

@Getter
public class MessageWithToken extends Message{

    private final TokenDTO token;

    public MessageWithToken(String message, TokenDTO tokenDTO) {
        super(message);
        this.token = tokenDTO;
    }
}
