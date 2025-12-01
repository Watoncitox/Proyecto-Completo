package cl.duoc.style.and.beauty.categoria.repository;

import cl.duoc.style.and.beauty.categoria.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}
