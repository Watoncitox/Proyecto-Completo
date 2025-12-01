package cl.duoc.style.and.beauty.trabajador.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TrabajadorDTO {
    private Long id;
    private Long idUsuario;
    private String especialidad;
    private Integer experiencia;
}
