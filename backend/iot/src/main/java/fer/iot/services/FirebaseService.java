package fer.iot.services;

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
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;

@Service
public class FirebaseService {

    @Autowired
    FirebaseApp firebaseApp;

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

    public void saveLimit(Sensor sensor, FirebaseGranicneVrijednosti data) {
        String kind = "limit";
        String name = sensor.label;
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

    public FirebaseGranicneVrijednosti getLimit(Sensor sensor) {
        String kind = "limit";
        String name = sensor.label;
        Key taskKey = d2.newKeyFactory().setKind(kind).newKey(name);
        Entity retrieved = d2.get(taskKey);
        return new FirebaseGranicneVrijednosti(retrieved.getDouble("value"));
    }
}