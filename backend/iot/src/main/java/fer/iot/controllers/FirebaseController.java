package fer.iot.controllers;

import fer.iot.data.FirebaseGranicneVrijednosti;
import fer.iot.data.FirebaseLastSense;
import fer.iot.data.Sensor;
import fer.iot.dto.LimitDTO;
import fer.iot.dto.SenseDTO;
import fer.iot.services.FirebaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/ls/temp")
    public void postTemperatureTEST(@RequestBody FirebaseLastSense data) {
        firebaseService.saveLastSense(Sensor.TEMPERATURE, data);
    }
    @PostMapping("/ls/humidity")
    public void postHumidityTEST(@RequestBody FirebaseLastSense data) {
        firebaseService.saveLastSense(Sensor.HUMIDITY, data);
    }

    @GetMapping("/ls/temp")
    public ResponseEntity<SenseDTO> getLastSenseTemperature(){
        return new ResponseEntity<>(SenseDTO.toDto(Sensor.TEMPERATURE, firebaseService.getSense(Sensor.TEMPERATURE)), HttpStatus.OK);
    }

    @GetMapping("/ls/humidity")
    public ResponseEntity<SenseDTO> getLastSenseHumidity(){
        return new ResponseEntity<>(SenseDTO.toDto(Sensor.HUMIDITY, firebaseService.getSense(Sensor.HUMIDITY)), HttpStatus.OK);
    }

    @GetMapping("/gv/temp")
    public ResponseEntity<LimitDTO> getLimitTemperature(){
        return new ResponseEntity<>(LimitDTO.toDto(Sensor.TEMPERATURE, firebaseService.getLimit(Sensor.TEMPERATURE)), HttpStatus.OK);
    }

    @GetMapping("/gv/humidity")
    public ResponseEntity<LimitDTO> getLimitHumidity(){
        return new ResponseEntity<>(LimitDTO.toDto(Sensor.HUMIDITY, firebaseService.getLimit(Sensor.HUMIDITY)), HttpStatus.OK);
    }
}


