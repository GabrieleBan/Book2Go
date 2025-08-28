package it.tartassati.readerservice.repository;

import it.tartassati.readerservice.model.ReaderHistory;


import it.tartassati.readerservice.model.ReaderHistoryId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;

public interface ReaderHistoryRepository  extends JpaRepository<ReaderHistory, ReaderHistoryId> {

    @Query("SELECT r.bookISBN FROM ReaderHistory r WHERE r.readerUUID = :reader ")
    List<String> getPersonalHistory(@Param("reader") String ReaderUUID);
    @Query
    List<ReaderHistory> findByReaderUUID(String readerUUID);
}

