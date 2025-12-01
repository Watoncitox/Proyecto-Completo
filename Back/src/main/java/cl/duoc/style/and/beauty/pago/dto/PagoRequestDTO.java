package cl.duoc.style.and.beauty.pago.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PagoRequestDTO {

    private Long idCita;
    private Integer monto;
    private String metodoPago;       // "EFECTIVO", "DEBITO", "CREDITO", etc.
    private String fechaPago;        // formato "2025-11-22T03:10:00"
}
