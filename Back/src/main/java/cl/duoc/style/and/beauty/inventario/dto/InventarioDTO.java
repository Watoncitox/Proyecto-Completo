package cl.duoc.style.and.beauty.inventario.dto;

import lombok.Data;
import java.util.Date;

@Data
public class InventarioDTO {
    private Long id;
    private Long productoId;
    private Integer cantidadDisponible;
    private Date fechaActualizacion;
}
