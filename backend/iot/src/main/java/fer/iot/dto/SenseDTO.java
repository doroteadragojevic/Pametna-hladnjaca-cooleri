package fer.iot.dto;

import com.google.cloud.Timestamp;
import com.google.type.DateTime;
import fer.iot.data.FirebaseLastSense;
import fer.iot.data.Sensor;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class SenseDTO {
    String sensor;
    Double value;
    Timestamp timestamp;

    public static SenseDTO toDto(Sensor sensor, FirebaseLastSense data){
        return new SenseDTO(sensor.label, data.getValue(), data.getTimestamp());
    }
}
