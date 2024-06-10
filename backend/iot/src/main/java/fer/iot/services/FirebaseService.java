package fer.iot.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Key;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.cloud.FirestoreClient;
import fer.iot.data.FirebaseGranicneVrijednosti;
import fer.iot.data.FirebaseLastSense;
import fer.iot.data.Sensor;
import fer.iot.data.Error;
import fer.iot.mqtt.MqttPublisherService;
import jakarta.annotation.PostConstruct;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;

@Service
public class FirebaseService {

    @Autowired
    FirebaseApp firebaseApp;

    @Autowired
    MqttPublisherService mqttPublisherService;

    FileInputStream serviceAccount =
            new FileInputStream("src/main/resources/google-service.json");


    Datastore d2 = DatastoreOptions.newBuilder().setProjectId("pametna-hladnjaca").setCredentials(GoogleCredentials.fromStream(serviceAccount)).build().getService();

    Firestore firestore;

    public FirebaseService() throws IOException {
    }

    @PostConstruct
    public void init() {
        this.firestore = FirestoreClient.getFirestore(firebaseApp);

    }

    public void saveLimitMax(Sensor sensor, FirebaseGranicneVrijednosti data) {
        String kind = "limit";
        String name = sensor.label + " max";
        Key limitKey = d2.newKeyFactory().setKind(kind).newKey(name);
        Entity limit = Entity.newBuilder(limitKey).set("value", data.getValue()).build();
        d2.put(limit);
    }

    public void saveLimitMin(Sensor sensor, FirebaseGranicneVrijednosti data) {
        String kind = "limit";
        String name = sensor.label + " min";
        Key limitKey = d2.newKeyFactory().setKind(kind).newKey(name);
        Entity limit = Entity.newBuilder(limitKey).set("value", data.getValue()).build();
        d2.put(limit);
    }

    public void saveLastSense(Sensor sensor, FirebaseLastSense data) {
        String kind = "sense";
        String name = sensor.label;
        Key senseKey = d2.newKeyFactory().setKind(kind).newKey(name);
        Entity sense = Entity.newBuilder(senseKey)
                .set("timestamp", data.getTimestamp())
                .set("value", data.getValue())
                .build();
        d2.put(sense);
    }

    public FirebaseLastSense getSense(Sensor sensor) {
        String kind = "sense";
        String name = sensor.label;
        Key taskKey = d2.newKeyFactory().setKind(kind).newKey(name);
        Entity retrieved = d2.get(taskKey);
        return new FirebaseLastSense(retrieved.getTimestamp("timestamp"), retrieved.getDouble("value"));
    }

    public FirebaseGranicneVrijednosti getLimitMax(Sensor sensor) {
        String kind = "limit";
        String name = sensor.label + " max";
        Key taskKey = d2.newKeyFactory().setKind(kind).newKey(name);
        Entity retrieved = d2.get(taskKey);
        return new FirebaseGranicneVrijednosti(retrieved.getDouble("value"));
    }

    public FirebaseGranicneVrijednosti getLimitMin(Sensor sensor) {
        String kind = "limit";
        String name = sensor.label + " min";
        Key taskKey = d2.newKeyFactory().setKind(kind).newKey(name);
        Entity retrieved = d2.get(taskKey);
        return new FirebaseGranicneVrijednosti(retrieved.getDouble("value"));
    }

    public void processSense(Sensor sensor, FirebaseLastSense sense) throws MqttException, JsonProcessingException {
        //provjeri jeli unutar granica ako nije onda dodaj u bazu kao error
        if(sensor == Sensor.TEMPERATURE || sensor == Sensor.HUMIDITY){
            checkLimit(sensor, sense);
        }
        //spremi mjerenje
        saveLastSense(sensor, sense);

    }

    private void  checkLimit(Sensor sensor, FirebaseLastSense sense) throws MqttException, JsonProcessingException {
        Double limitMax = getLimitMax(sensor).getValue();
        Double limitMin = getLimitMin(sensor).getValue();
        if(sense.getValue() > limitMax || sense.getValue() < limitMin){
            putError(sensor, sense);
            mqttPublisherService.publishMessage();
        } else{
            deleteError(sensor);
        }
    }

    private void deleteError(Sensor sensor) {
        String kind = "error";
        String name = sensor.label;
        Key taskKey = d2.newKeyFactory().setKind(kind).newKey(name);
        d2.delete(taskKey);
    }

    public Error getError(Sensor sensor) {
        String kind = "error";
        String name = sensor.label;
        Key taskKey = d2.newKeyFactory().setKind(kind).newKey(name);
        Entity retrieved = d2.get(taskKey);
        if(retrieved == null) return null;
        return new Error(retrieved.getTimestamp("timestamp"),
                retrieved.getDouble("value"),
                retrieved.getTimestamp("errorStartedTimestamp")
                );
    }


    private void putError(Sensor sensor, FirebaseLastSense sense) {
        //ako error vec postoji, prekopiraj timestamp, ako ne stvori novi
        Error error =getError(sensor);
        String kind = "error";
        String name = sensor.label;
        Key senseKey = d2.newKeyFactory().setKind(kind).newKey(name);
        Entity data;
        if(error == null){
            data = Entity.newBuilder(senseKey)
                    .set("timestamp", sense.getTimestamp())
                    .set("value", sense.getValue())
                    .set("errorStartedTimestamp", sense.getTimestamp())
                    .build();
        } else {
            data = Entity.newBuilder(senseKey)
                    .set("timestamp", sense.getTimestamp())
                    .set("value", sense.getValue())
                    .set("errorStartedTimestamp", error.getErrorStartedTimestamp())
                    .build();
        }
        d2.put(data);
    }
}