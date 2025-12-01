package cl.duoc.style.and.beauty.promocion.dto;

import lombok.Data;

@Data
public class PromocionRequestDTO {
    private Long servicioId;
    private Double descuento;
    private String fechaInicio;
    private String fechaFin;
}
