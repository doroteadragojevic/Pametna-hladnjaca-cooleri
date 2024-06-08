package fer.iot.mqtt;

import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MqttConfig {

    private static final String MQTT_BROKER_URL = "tcp://djx.entlab.hr:8883";
    private static final String MQTT_CLIENT_ID = "backend";

    @Bean
    public IMqttClient mqttClient() throws MqttException {
        IMqttClient mqttClient = new MqttClient(MQTT_BROKER_URL, MQTT_CLIENT_ID);
        MqttConnectOptions options = new MqttConnectOptions();
        options.setAutomaticReconnect(true);
        options.setUserName("intstv");
        options.setPassword(new String("A4j6gC15br").toCharArray());
        options.setCleanSession(true);
        options.setConnectionTimeout(30);
        mqttClient.connect(options);
        return mqttClient;
    }
}

