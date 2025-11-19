package it.tartassati.readerservice;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableRabbit
public class ReaderServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReaderServiceApplication.class, args);
    }

}
