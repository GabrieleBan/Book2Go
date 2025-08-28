package it.tartassati.readerservice.controller;


import it.tartassati.readerservice.model.Reader;
import it.tartassati.readerservice.model.ReaderHistory;
import it.tartassati.readerservice.service.ReaderService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/readers")
public class ReaderController {
    private ReaderService readerService;
    public ReaderController(ReaderService readerService) {
        this.readerService = readerService;
    }
    @GetMapping()
    public void createRndReader() {
        Reader r=new Reader();
        readerService.addReader(r);
    }
    @GetMapping("/history/{readerUUIID}")
    public List<ReaderHistory> getReaderHistory(@PathVariable String readerUUIID) {
        return readerService.getReaderHistory(readerUUIID);
    }

    @GetMapping("/{readerUUIID}")
    public Reader getReaderData(@PathVariable String readerUUIID) {
        return readerService.getReaderData(readerUUIID);
    }
}
