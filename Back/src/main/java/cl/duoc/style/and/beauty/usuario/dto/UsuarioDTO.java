package cl.duoc.style.and.beauty.usuario.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioDTO {
    private Long id;
    private String uid;
    private String nombre;
    private String correo;
    private String estado;
    private String rol;
}
