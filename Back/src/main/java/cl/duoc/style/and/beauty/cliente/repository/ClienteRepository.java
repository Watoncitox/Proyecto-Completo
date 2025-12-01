package cl.duoc.style.and.beauty.cliente.repository;

import cl.duoc.style.and.beauty.cliente.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
