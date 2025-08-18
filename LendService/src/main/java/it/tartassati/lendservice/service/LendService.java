package it.tartassati.lendservice.service;

import it.tartassati.lendservice.model.Lend;
import it.tartassati.lendservice.repository.LendRepository;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class LendService {

    private final LendRepository lendRepository;

    public LendService(LendRepository lendRepository) {
        this.lendRepository = lendRepository;
    }

    public Lend createLend(Lend lend) {
        return lendRepository.save(lend);
    }

    public Lend prolongLend(Long lendId, Date newDate) {

//        serve logica
        int updatedRows = lendRepository.prolongLend(lendId, newDate);
        if (updatedRows > 0) {
            return lendRepository.findById(lendId).orElse(null);
        } else {
            throw new RuntimeException("Lend not found");
        }
    }

    public List<Lend> getLendsByReader(Long readerId) {
        return lendRepository.findByReaderId(readerId);
    }
}
