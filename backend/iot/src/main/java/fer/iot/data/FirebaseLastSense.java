package fer.iot.data;

import lombok.Data;

@Data
public class FirebaseLastSense {

    private static final String ENTITY_NAME = "last-data";
    private String timestamp;
    private String value;

}
