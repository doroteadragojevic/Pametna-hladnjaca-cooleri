package fer.iot.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import fer.iot.data.Error;
import fer.iot.data.FirebaseGranicneVrijednosti;
import fer.iot.data.FirebaseLastSense;
import fer.iot.data.Sensor;
import fer.iot.dto.ErrorDTO;
import fer.iot.dto.LimitDTO;
import fer.iot.dto.SenseDTO;
import fer.iot.mqtt.MqttPublisherService;
import fer.iot.services.FirebaseService;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/iot")
public class FirebaseController {

    @Autowired
    MqttPublisherService mqttPublisherService;

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

    @PostMapping("/ls/motion")
    public void postMotion(@RequestBody FirebaseLastSense data) {
        firebaseService.saveLastSense(Sensor.MOVEMENT, data);
    }

    @PostMapping("/ls/humidity")
    public void postHumidityTEST(@RequestBody FirebaseLastSense data) {
        firebaseService.saveLastSense(Sensor.HUMIDITY, data);
    }

    @GetMapping("/ls/temp")
    public ResponseEntity<SenseDTO> getLastSenseTemperature() {
        return new ResponseEntity<>(SenseDTO.toDto(Sensor.TEMPERATURE, firebaseService.getSense(Sensor.TEMPERATURE)), HttpStatus.OK);
    }

    @GetMapping("/ls/motion")
    public ResponseEntity<SenseDTO> getLastSenseMotion() {
        return new ResponseEntity<>(SenseDTO.toDto(Sensor.MOVEMENT, firebaseService.getSense(Sensor.MOVEMENT)), HttpStatus.OK);
    }

    @GetMapping("/ls/humidity")
    public ResponseEntity<SenseDTO> getLastSenseHumidity() {
        return new ResponseEntity<>(SenseDTO.toDto(Sensor.HUMIDITY, firebaseService.getSense(Sensor.HUMIDITY)), HttpStatus.OK);
    }

    @GetMapping("/gv/temp")
    public ResponseEntity<LimitDTO> getLimitTemperature() {
        return new ResponseEntity<>(LimitDTO.toDto(Sensor.TEMPERATURE, firebaseService.getLimit(Sensor.TEMPERATURE)), HttpStatus.OK);
    }

    @GetMapping("/gv/humidity")
    public ResponseEntity<LimitDTO> getLimitHumidity() {
        return new ResponseEntity<>(LimitDTO.toDto(Sensor.HUMIDITY, firebaseService.getLimit(Sensor.HUMIDITY)), HttpStatus.OK);
    }

    @GetMapping("/error/temp")
    public ResponseEntity<ErrorDTO> getError() {
        Error e = firebaseService.getError(Sensor.TEMPERATURE);
        if (e == null) {
            return new ResponseEntity<>(null, HttpStatus.OK);
        } else return new ResponseEntity<>(ErrorDTO.toDto(Sensor.TEMPERATURE, e), HttpStatus.OK);
    }

    @GetMapping("/error/humidity")
    public ResponseEntity<ErrorDTO> getErrorHumidity() {
        Error e = firebaseService.getError(Sensor.HUMIDITY);
        if (e == null) {
            return new ResponseEntity<>(null, HttpStatus.OK);
        } else return new ResponseEntity<>(ErrorDTO.toDto(Sensor.HUMIDITY, e), HttpStatus.OK);
    }

    @GetMapping("/actuate")
    public ResponseEntity<String> actuate(){
        try {
            mqttPublisherService.publishMessage();
            return new ResponseEntity<>("Actuated.", HttpStatus.OK);
        } catch (MqttException e) {
            return new ResponseEntity<>("Mqtt exception.", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>("JSON processing exception.", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}


