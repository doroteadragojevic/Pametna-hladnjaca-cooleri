package fer.iot.data;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.google.cloud.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class FirebaseLastSense {

    @JsonDeserialize(using = TimestampDeserializer.class)
    private Timestamp timestamp;
    private Double value;

}
