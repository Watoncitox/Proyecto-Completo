package cl.duoc.style.and.beauty.usuario.repository;

import cl.duoc.style.and.beauty.usuario.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByUid(String uid);

    Optional<Usuario> findByCorreo(String correo);
}
