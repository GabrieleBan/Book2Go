package it.tartassati.readerservice.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Date;

@Entity
@IdClass(ReaderHistoryId.class)
@Getter
@Setter
@Table(name="reader_history")
public class ReaderHistory {
    @Id
    private String readerUUID;
    @Id
    private String bookISBN;
    private Date addedDate;
    private Date removedDate;
}
