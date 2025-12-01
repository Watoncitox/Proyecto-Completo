package cl.duoc.style.and.beauty.trabajador.repository;

import cl.duoc.style.and.beauty.trabajador.model.Trabajador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrabajadorRepository extends JpaRepository<Trabajador, Long> {
}
