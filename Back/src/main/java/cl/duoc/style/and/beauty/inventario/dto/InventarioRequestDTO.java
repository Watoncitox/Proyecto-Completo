package cl.duoc.style.and.beauty.inventario.dto;

import lombok.Data;

@Data
public class InventarioRequestDTO {
    private Long productoId;
    private Integer cantidadDisponible;
}
