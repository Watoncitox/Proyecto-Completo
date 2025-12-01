package cl.duoc.style.and.beauty.cliente.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ClienteDTO {
    private Long id;
    private String nombre;
    private String correo;
    private String telefono;
}
