package it.tartassati.lendservice.controller;

import it.tartassati.lendservice.model.Lend;
import it.tartassati.lendservice.service.LendService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/lends")
public class LendController {
    private LendService lendService;
    public LendController(LendService lendService) {
        this.lendService = lendService;
    }

    @GetMapping("/{readerId}")
    public List<Lend> getReaderLends(Long readerId) {
        return lendService.getLendsByReader(readerId);
    }
}
