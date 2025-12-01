package cl.duoc.style.and.beauty.promocion.dto;

import lombok.Data;

@Data
public class PromocionDTO {
    private Long id;
    private Long servicioId;
    private String servicioNombre;
    private Double descuento;
    private String fechaInicio;
    private String fechaFin;
    private String activa;
}
