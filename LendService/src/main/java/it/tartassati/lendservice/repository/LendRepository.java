package it.tartassati.lendservice.repository;

import it.tartassati.lendservice.model.Lend;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;
// qui devo mettere le tutto cio che riguara prendere info dal db e metterle
public interface LendRepository  extends JpaRepository<Lend, Long> {
    @Query ("SELECT l FROM Lend l WHERE l.clientId = :readerId")
    List<Lend> findByReaderId(Long readerId);


    @Transactional
    @Modifying
    @Query("UPDATE Lend l SET l.endOfLend = :newDate WHERE l.id = :lendId")
    int prolongLend(@Param("lendId") Long lendId, @Param("newDate") Date newDate);
//    List<Lend> findBySessionId(String sessionId);
//    @Modifying
//    @Query("DELETE FROM Lend t WHERE t.sessionId NOT IN (:sessionIds)")
//    void deleteTasksNotInSessionIds(List<String> sessionIds);

}