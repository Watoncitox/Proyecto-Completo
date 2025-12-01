package cl.duoc.style.and.beauty.horario.repository;

import cl.duoc.style.and.beauty.horario.model.HorarioTrabajador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HorarioTrabajadorRepository extends JpaRepository<HorarioTrabajador, Long> {
}
