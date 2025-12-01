package cl.duoc.style.and.beauty.usuario.service;

import cl.duoc.style.and.beauty.usuario.dto.UsuarioDTO;
import cl.duoc.style.and.beauty.usuario.dto.UsuarioRequestDTO;
import cl.duoc.style.and.beauty.usuario.model.Usuario;
import cl.duoc.style.and.beauty.usuario.repository.RolRepository;
import cl.duoc.style.and.beauty.usuario.repository.UsuarioRepository;
import cl.duoc.style.and.beauty.usuario.model.Rol;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public UsuarioDTO save(UsuarioRequestDTO dto) {

        Usuario u = new Usuario();
        u.setUid(dto.getUid());
        u.setCorreo(dto.getCorreo());
        u.setNombre(dto.getNombre());
        u.setRol(dto.getRol());
        u.setEstado("ACTIVO");

        return toDTO(usuarioRepository.save(u));
    }

    public List<UsuarioDTO> findAll() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public UsuarioDTO findById(Long id) {
        return usuarioRepository.findById(id)
                .map(this::toDTO)
                .orElse(null);
    }

    private UsuarioDTO toDTO(Usuario u) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(u.getId());
        dto.setUid(u.getUid());
        dto.setCorreo(u.getCorreo());
        dto.setNombre(u.getNombre());
        dto.setRol(u.getRol());
        dto.setEstado(u.getEstado());
        return dto;
    }
}
