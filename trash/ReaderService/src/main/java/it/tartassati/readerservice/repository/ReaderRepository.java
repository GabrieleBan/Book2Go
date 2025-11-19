package it.tartassati.readerservice.repository;

import it.tartassati.readerservice.model.Reader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReaderRepository  extends JpaRepository<Reader, Long> {

    @Query("SELECT r FROM Reader r WHERE r.readerUUID = :reader ")
    Reader getReaderData(@Param("reader") String ReaderUUID);
}