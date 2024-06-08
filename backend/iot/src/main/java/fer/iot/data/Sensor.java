package fer.iot.data;

public enum Sensor {
    TEMPERATURE("temperature"),
    HUMIDITY("humidity"),
    MOVEMENT("motion");

    public final String label;

    Sensor(String label) {
        this.label = label;
    }
}
