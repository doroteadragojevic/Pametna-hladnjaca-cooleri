package fer.iot.data;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JsonRepresentation {

    private Source source;
    private List<ContentNode> contentNodes;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Source {
        private String gatewayGroup = "Grupa16GWGroup";
        private String resource = "Grupa16Led";
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ContentNode {
        private Double value = 1.;
    }
}
