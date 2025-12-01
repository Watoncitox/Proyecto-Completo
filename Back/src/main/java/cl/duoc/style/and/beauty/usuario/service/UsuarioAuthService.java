package cl.duoc.style.and.beauty.usuario.service;

import cl.duoc.style.and.beauty.usuario.model.Usuario;
import cl.duoc.style.and.beauty.usuario.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioAuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario cargarUsuarioPorUid(String uid) {
        return usuarioRepository.findByUid(uid)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado en Oracle"));
    }
}
