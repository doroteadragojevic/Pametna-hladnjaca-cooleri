package fer.iot.controllers;

import fer.iot.data.FirebaseGranicneVrijednosti;
import fer.iot.data.Sensor;
import fer.iot.services.FirebaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/iot")
public class FirebaseController {

    @Autowired
    FirebaseService firebaseService;

    @Autowired
    public FirebaseController(FirebaseService firebaseService) {
        this.firebaseService = firebaseService;
    }

    @PostMapping("/gv/temp")
    public void postTemperature(@RequestBody FirebaseGranicneVrijednosti data) {
        firebaseService.saveLimit(Sensor.TEMPERATURE, data);
    }
    @PostMapping("/gv/humidity")
    public void postHumidity(@RequestBody FirebaseGranicneVrijednosti data) {
        firebaseService.saveLimit(Sensor.HUMIDITY, data);
    }
}


