package cl.duoc.style.and.beauty.pago.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class PagoDTO {

    private Long id;
    private Long idCita;
    private String metodo;
    private Double monto;
    private Date fechaPago;
    private String estado;
}
