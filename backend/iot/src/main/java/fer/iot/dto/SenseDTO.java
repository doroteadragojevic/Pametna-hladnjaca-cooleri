package fer.iot.dto;

import com.google.type.DateTime;
import lombok.Data;

@Data
public class SenseDTO {
    String sensor;
    Float value;
    DateTime timestamp;
}
