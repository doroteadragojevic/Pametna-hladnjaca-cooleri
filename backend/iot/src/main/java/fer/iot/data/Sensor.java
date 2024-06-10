package fer.iot.data;

public enum Sensor {
    TEMPERATURE("temperature"),
    HUMIDITY("humidity"),
    MOVEMENT("motion");

    public final String label;

    Sensor(String label) {
        this.label = label;
    }

    public static Sensor get(String s) {
        switch (s){
            case "temperature":
                return TEMPERATURE;
            case "humidity":
                return HUMIDITY;
            case "motion":
                return MOVEMENT;
            default:
                throw new IllegalArgumentException("Wrong name.");
        }
    }
}
