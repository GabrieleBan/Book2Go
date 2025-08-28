package it.tartassati.readerservice.service;

import it.tartassati.readerservice.model.Reader;
import it.tartassati.readerservice.model.ReaderHistory;
import it.tartassati.readerservice.repository.ReaderHistoryRepository;
import it.tartassati.readerservice.repository.ReaderRepository;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
public class ReaderService {

    private final ReaderRepository readerRepository;
    private final ReaderHistoryRepository readerHistoryRepository;

    public ReaderService(ReaderRepository readerRepository, ReaderHistoryRepository readerHistoryRepository) {
        this.readerRepository = readerRepository;
        this.readerHistoryRepository = readerHistoryRepository;
    }

    public Reader addReader(Reader reader) {
        return readerRepository.save(reader);
    }
    public List<ReaderHistory> getReaderHistory(String reader) {
        return readerHistoryRepository.findByReaderUUID(reader);
    }

    public void addBooktoReader(String bookISBN, String readerUUID) {
        ReaderHistory newEntry = new ReaderHistory();
        newEntry.setReaderUUID(readerUUID);
        newEntry.setBookISBN(bookISBN);
        Date today = Date.valueOf(LocalDate.now());
        newEntry.setAddedDate(today);
        readerHistoryRepository.save(newEntry);
    }

    public Reader getReaderData(String readerUUIID) {
        return readerRepository.getReaderData(readerUUIID);

    }
}
