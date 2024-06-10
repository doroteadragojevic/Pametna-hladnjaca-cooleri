package fer.iot.data;

public enum Sensor {
    TEMPERATURE("temperatura"),
    HUMIDITY("humidity"),
    MOVEMENT("motions");

    public final String label;

    Sensor(String label) {
        this.label = label;
    }

    public static Sensor get(String s) {
        switch (s){
            case "temperatura":
                return TEMPERATURE;
            case "humidity":
                return HUMIDITY;
            case "motions":
                return MOVEMENT;
            default:
                throw new IllegalArgumentException("Wrong name.");
        }
    }
}
