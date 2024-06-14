package fer.iot.mqtt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import fer.iot.data.JsonRepresentation;
import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MqttPublisherService {

    private static final String ACTUATE = "intstv_cooleri/input/actuate";

    @Autowired
    private IMqttClient mqttClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public void publishMessage() throws MqttException, JsonProcessingException {
        if (!mqttClient.isConnected()) {
            throw new IllegalStateException("MQTT client is not connected");
        }


        JsonRepresentation payload = new JsonRepresentation();
        String jsonPayload = objectMapper.writeValueAsString(payload);
        MqttMessage message = new MqttMessage(jsonPayload.getBytes());
        message.setQos(2); // Kvaliteta usluge (0, 1, ili 2)
        message.setRetained(false); // True da broker zadrži zadnju poruku
        mqttClient.publish(ACTUATE, message);
    }
}
