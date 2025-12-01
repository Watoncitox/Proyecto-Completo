package cl.duoc.style.and.beauty.servicio.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ServicioDTO {
    private Long id;
    private Long categoriaId;
    private String categoriaNombre;
    private String nombre;
    private String descripcion;
    private Integer duracionMin;
    private Double precio;
    private String imagenUrl;
}
