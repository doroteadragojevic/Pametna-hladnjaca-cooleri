package fer.iot.data;

public enum Sensor {
    TEMPERATURE("temp"),
    HUMIDITY("hum"),
    MOVEMENT("mot");

    public final String label;

    Sensor(String label) {
        this.label = label;
    }

    public static Sensor get(String s) {
        switch (s){
            case "temp":
                return TEMPERATURE;
            case "hum":
                return HUMIDITY;
            case "mot":
                return MOVEMENT;
            default:
                throw new IllegalArgumentException("Wrong name.");
        }
    }
}
