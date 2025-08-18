package it.tartassati.lendservice.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Table(name = "lends")
@Data
@NoArgsConstructor
public class Lend {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private Long clientId;
    private boolean isPhysical;
    private Long bookId;
    private Date startDate;
    private Date endOfLend;
    private State state;

}

