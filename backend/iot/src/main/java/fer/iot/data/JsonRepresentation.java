package fer.iot.data;

import java.util.List;
import java.util.ListIterator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JsonRepresentation {

    private Source source = new Source();
    private List<ContentNode> contentNodes = List.of(new ContentNode());

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
