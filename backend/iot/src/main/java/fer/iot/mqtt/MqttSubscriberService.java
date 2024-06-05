package fer.iot.mqtt;

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
    private static final String TEMPERATURE = "/grupa16/device1/temperature";
    private static final String HUMIDITY = "/grupa16/device1/humidity";
    private static final String MOVEMENT = "/grupa16/device1/motion";

    @PostConstruct
    public void subscribeToTopic() throws MqttException {
        if (!mqttClient.isConnected()) {
            throw new IllegalStateException("MQTT client is not connected");
        }

        mqttClient.subscribe(TEMPERATURE, new IMqttMessageListener() {
            @Override
            public void messageArrived(String topic, MqttMessage message) throws Exception {
                String payload = new String(message.getPayload());
                System.out.println("Message received on topic " + topic + ": " + payload);
                // Obradite dolaznu poruku ovdje
                //TODO
                FirebaseLastSense data;
                firebaseService.processSense(Sensor.TEMPERATURE, data);
            }
        });
        mqttClient.subscribe(HUMIDITY, new IMqttMessageListener() {
            @Override
            public void messageArrived(String topic, MqttMessage message) throws Exception {
                String payload = new String(message.getPayload());
                System.out.println("Message received on topic " + topic + ": " + payload);
                // Obradite dolaznu poruku ovdje
                //TODO
                FirebaseLastSense data;
                firebaseService.processSense(Sensor.HUMIDITY, data);
            }
        });
        mqttClient.subscribe(MOVEMENT, new IMqttMessageListener() {
            @Override
            public void messageArrived(String topic, MqttMessage message) throws Exception {
                String payload = new String(message.getPayload());
                System.out.println("Message received on topic " + topic + ": " + payload);
                // Obradite dolaznu poruku ovdje
                //TODO
                FirebaseLastSense data;
                firebaseService.processSense(Sensor.MOVEMENT, data);
            }
        });
    }
}

