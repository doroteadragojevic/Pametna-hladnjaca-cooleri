package fer.iot.mqtt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.cloud.Timestamp;
import fer.iot.data.FirebaseLastSense;
import fer.iot.data.Sensor;
import fer.iot.services.FirebaseService;
import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.IMqttMessageListener;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class MqttSubscriberService {

    @Autowired
    private IMqttClient mqttClient;

    @Autowired
    private FirebaseService firebaseService;

    //TODO
    private static final String TEMPERATURE = "intstv_cooleri/output/temp";
    private static final String HUMIDITY = "intstv_cooleri/output/hum";
    private static final String MOVEMENT = "intstv_cooleri/output/mot";

    @PostConstruct
    public void subscribeToTopic() throws MqttException {
        if (!mqttClient.isConnected()) {
            throw new IllegalStateException("MQTT client is not connected");
        }

        IMqttMessageListener listener = new IMqttMessageListener() {
            @Override
            public void messageArrived(String topic, MqttMessage message) throws Exception {
                String payload = new String(message.getPayload());
                System.out.println("Message received on topic " + topic + ": " + payload);
                FirebaseLastSense data = null;
                try {
                    ObjectMapper objectMapper = new ObjectMapper();
                    JsonNode rootNode = objectMapper.readTree(payload);
                    JsonNode contentNodes = rootNode.path("contentNodes");
                    if (contentNodes.isArray()) {
                        for (JsonNode node : contentNodes) {
                            double value = node.path("value").asDouble();
                            System.out.println("Value: " + value);
                            data = new FirebaseLastSense(Timestamp.now(), value);
                        }
                    }
                } catch (JsonProcessingException e) {
                    //e.printStackTrace();
                };

                firebaseService.processSense(Sensor.get(extractLastValue(topic)), data);
            }
        };

        mqttClient.subscribe(TEMPERATURE, listener);
        mqttClient.subscribe(HUMIDITY, listener);
        mqttClient.subscribe(MOVEMENT, listener);
    }

    private static String extractLastValue(String input) {
        if (input == null || input.isEmpty()) {
            return "";
        }
        String[] parts = input.split("/");
        return parts[parts.length - 1];
    }
}

