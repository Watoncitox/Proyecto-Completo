package cl.duoc.style.and.beauty.servicio.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class ServicioRequestDTO {
    private Long categoriaId;
    private String nombre;
    private String descripcion;
    private Double precio;
    private Integer duracionMin;
}

