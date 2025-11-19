package it.tartassati.readerservice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Entity
@NoArgsConstructor

@Table(name="Readers")
public class Reader {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String readerUUID;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    private String username;
    private String name;
    private String surname;
    private String phone;
    private String address;
    private SubscriptionsType subType;

}
