package fer.iot.data;

import com.google.cloud.Timestamp;
import com.google.type.DateTime;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class FirebaseLastSense {

    private static final String ENTITY_NAME = "last-data";
    private Timestamp timestamp;
    private Double value;

}
