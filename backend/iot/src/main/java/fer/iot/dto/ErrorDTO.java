package fer.iot.dto;


import com.google.cloud.Timestamp;
import fer.iot.data.Error;
import fer.iot.data.FirebaseLastSense;
import fer.iot.data.Sensor;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ErrorDTO {

    String sensor;
    Double value;
    Timestamp timestamp;
    Timestamp errorStartedTimestamp;

    public static ErrorDTO toDto(Sensor sensor, Error data){
        return new ErrorDTO(sensor.label, data.getValue(), data.getTimestamp(), data.getErrorStartedTimestamp());
    }
}
