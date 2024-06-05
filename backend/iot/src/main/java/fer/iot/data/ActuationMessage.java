package fer.iot.data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
class Header {
    private long timestamp;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class Body {
    private Grupa16 Grupa16;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class Grupa16 {
    private String actuate = "actuate";
}

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActuationMessage {
    private Header header;
    private Body body;

    public ActuationMessage(Long timestamp){
        this.header.setTimestamp(timestamp);
    }
}

