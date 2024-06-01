package fer.iot.dto;

import fer.iot.data.FirebaseGranicneVrijednosti;
import fer.iot.data.Sensor;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class LimitDTO {
    String sensor;
    Double value;

    public static LimitDTO toDto(Sensor sensor, FirebaseGranicneVrijednosti data){
        return new LimitDTO(sensor.label, data.getValue());
    }
}
